from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse


def index(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            CREATE OR REPLACE FUNCTION enforce_manager_count() RETURNS trigger AS $$
            DECLARE
                max_manager_count INTEGER := 5;
                manager_count INTEGER := 0;
                must_check BOOLEAN := false;
            BEGIN
                IF TG_OP = 'INSERT' THEN
                    must_check := true;
                END IF;

                IF TG_OP = 'UPDATE' THEN
                    IF (NEW.d_username != OLD.d_username) THEN
                        must_check := true;
                    END IF;
                END IF;

                IF must_check THEN
                    -- prevent concurrent inserts from multiple transactions
                    LOCK TABLE DB_manager IN EXCLUSIVE MODE;

                    SELECT INTO manager_count COUNT(*) 
                    FROM DB_manager;

                    IF manager_count >= max_manager_count THEN
                        RAISE EXCEPTION 'No more managers are allowed in the system. Maximum number is reached.';
                    END IF;
                END IF;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        """)

        cursor.execute("""
            CREATE TRIGGER enforce_manager_count 
                BEFORE INSERT OR UPDATE ON DB_manager
                FOR EACH ROW EXECUTE PROCEDURE enforce_manager_count();
        """)

        cursor.execute("""
           CREATE OR REPLACE FUNCTION filter_interacting_targets (
            measure_type varchar,
            min_affinity real, 
            max_affinity real
            )
            RETURNS TABLE (
            uniprot_id varchar,
            target_name varchar,
			drugbank_id varchar
            ) 
            LANGUAGE plpgsql    
            as $$
            BEGIN
               RETURN QUERY SELECT RI.uniprot_id, TP.target_name, RI.drugbank_id
			   FROM reaction_info RI, target_protein TP
			   WHERE RI.uniprot_id = TP.uniprot_id and measure = RI.measure 
			   and min_affinity <= RI.affinity and max_affinity >= RI.affinity;
            END;$$
        """)

    return HttpResponse("Triggers are successfully created.")
