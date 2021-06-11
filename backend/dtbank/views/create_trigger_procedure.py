from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse


def index(request):
    with connection.cursor() as cursor:

        # Manager count not more than 5
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

        # Requirement 20
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
			   WHERE RI.uniprot_id = TP.uniprot_id and measure_type = RI.measure 
			   and min_affinity <= RI.affinity and max_affinity >= RI.affinity;
            END;$$
        """)

        # Requirement 21.a
        cursor.execute("""
            CREATE OR REPLACE FUNCTION delete_cascade() RETURNS trigger AS
                $$
                BEGIN

                    DELETE from interacts
                    WHERE interacts.drugbank_id1 = OLD.drugbank_id;

                    DELETE from has_sider
                    WHERE has_sider.drugbank_id = OLD.drugbank_id;

                    DELETE from reaction_info 
                    WHERE reaction_info.drugbank_id = OLD.drugbank_id;

                    DELETE from drug 
                    WHERE drug.drugbank_id = OLD.drugbank_id;

                    return OLD;
                END;$$ LANGUAGE plpgsql;
        """)

        cursor.execute("""
            CREATE TRIGGER drug_cascade
            AFTER DELETE ON drug FOR EACH ROW
            EXECUTE FUNCTION delete_cascade();
        """)

        # Requirement 21.b


        # Requirement 21.c
        cursor.execute("""
            CREATE OR REPLACE FUNCTION point_calculator() RETURNS trigger AS $$
            DECLARE
                contributor_number real;
                points real;
            BEGIN
                IF TG_OP = 'INSERT' THEN
                    SELECT INTO points points 
                    FROM Institution_point;

                    points = points + 5;
                END IF;

                IF TG_OP = 'UPDATE' THEN
                    SELECT INTO points points 
                    FROM Institution_point;

                    points = points + 2;
                END IF;

                IF TG_OP = 'DELETE' THEN
                    SELECT INTO points points 
                    FROM Institution_point;

                    points = points - 2;
                END IF;

                return NEW;
                END;$$ LANGUAGE plpgsql;
        """)

        cursor.execute("""
            CREATE TRIGGER point_calculator
            AFTER INSERT or UPDATE or DELETE ON Article
            EXECUTE FUNCTION point_calculator();
        """)

    return HttpResponse("Triggers are successfully created.")
