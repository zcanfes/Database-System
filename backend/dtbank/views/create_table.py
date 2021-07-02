from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse


def index(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            CREATE TABLE Drug ( -- Drug info in Drugbank
                drugbank_id VARCHAR, -- maximum length in the given table is 7
                drug_name VARCHAR, -- name of the drug, unique, length is unknown
                drug_descr VARCHAR, -- description of the drug, length is unknown, this isn't unique since some drug descriptions can be null
                smiles VARCHAR, -- SMILES of the drug, length can be longer than char, not UNIQUE, some drugs may have the same SMILES
                PRIMARY KEY (drugbank_id)
            );
        """)

        cursor.execute("""
            CREATE TABLE Interacts ( -- Drug interactions with other drugs
                drugbank_id1 VARCHAR, -- drug 1
                drugbank_id2 VARCHAR, -- drug that interacts with drug 1
                PRIMARY KEY (drugbank_id1, drugbank_id2),
                FOREIGN KEY (drugbank_id1) REFERENCES Drug
                    ON DELETE CASCADE -- if drugs are deleted/updated, delete the interaction
                    ON UPDATE CASCADE,
                FOREIGN KEY (drugbank_id2) REFERENCES Drug
                    ON DELETE CASCADE -- if drugs are deleted/updated, delete the interaction
                    ON UPDATE CASCADE
            );
        """)

        cursor.execute("""
            CREATE TABLE Target_protein ( -- Drug's target protein
                uniprot_id VARCHAR, -- id of the protein
                sequence VARCHAR, --  aminoacid sequence of the protein, unique to the protein, each aminoacid sequence has 1-to-1 correspondence with their protein
                target_name VARCHAR, -- protein name
                PRIMARY KEY (uniprot_id)
            );
        """)

        cursor.execute("""
            CREATE TABLE Side_effects ( -- Side effects and their id's
                umlscui VARCHAR, -- max length of the umlscui is 8 in the table
                side_effect_name VARCHAR, -- name of the side effect
                PRIMARY KEY (umlscui)
            );
        """)

        cursor.execute("""
            CREATE TABLE Has_sider ( -- Relation between the side effect and drug.
                umlscui VARCHAR,
                drugbank_id VARCHAR,
                PRIMARY KEY (umlscui, drugbank_id), -- umlscui and drugbank_id are the composite keys, since a drug may have multiple side effects and a side effect may be caused by different drugs.
                FOREIGN KEY (umlscui) REFERENCES Side_effects
                    ON DELETE CASCADE -- If side effect id is deleted, delete the relation between the side effect and the drug
                    ON UPDATE CASCADE, -- If side effect id is updated, delete the relation between the side effect and the drug
                FOREIGN KEY (drugbank_id) REFERENCES Drug
                    ON DELETE CASCADE -- If drugbank_id is deleted, delete the relation between the side effect and the drug
                    ON UPDATE CASCADE -- If drugbank_id is updated, delete the relation between the side effect and the drug
            );
        """)

        cursor.execute("""
            CREATE TABLE DT_User ( -- User of the system
                author_name VARCHAR,
                username VARCHAR,
                institute_name VARCHAR,
                u_password VARCHAR,
                PRIMARY KEY (username, institute_name) -- They are composite keys since "There exists only one user with a specific username and institute." (See Description)
            );
        """)

        cursor.execute("""
            CREATE TABLE DB_manager ( -- Manager of the database
                d_username VARCHAR,
                d_password VARCHAR,
                PRIMARY KEY (d_username)
            );
        """)

        cursor.execute("""
            CREATE TABLE Article ( -- Article information
                DOI VARCHAR, -- DOI of the article
                author_name VARCHAR, -- username first author of the article
                institute_name VARCHAR, -- institute of the first author
                PRIMARY KEY (DOI, author_name, institute_name)
            );
        """)

        cursor.execute("""
            CREATE TABLE Reaction_info ( -- Information about the reaction between the drug
                reaction_id VARCHAR, -- reaction id is at most 8 in length, a real number
                drugbank_id VARCHAR, -- drug that is a part of this reaction
                uniprot_id VARCHAR, -- target protein in the reaction
                affinity REAL, -- affinity of the binding in nM
                measure VARCHAR, -- measure of the interaction, max length is of IC50 = 4
                DOI VARCHAR, -- DOI of the article about this reaction
                PRIMARY KEY (reaction_id),
                FOREIGN KEY (drugbank_id) REFERENCES Drug
                    ON DELETE CASCADE -- if a drugbank_id is deleted, delete this reaction
                    ON UPDATE CASCADE, -- if a drugbank_id is updated, delete this reaction
                FOREIGN KEY (uniprot_id) REFERENCES Target_protein
                    ON DELETE CASCADE -- if a uniprot_id is deleted, delete this reaction
                    ON UPDATE CASCADE -- if a uniprot_id is updated, delete this reaction
            );
        """)

        cursor.execute("""
            CREATE TABLE Institution_point (
                institution_name VARCHAR,
                points REAL,
                PRIMARY KEY(institution_name)
            );
        """)

    return HttpResponse("Tables are successfully created.")
