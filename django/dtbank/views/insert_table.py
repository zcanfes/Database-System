from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
import pandas as pd

def read_tables(excel_file):
    xls = pd.ExcelFile(excel_file)
    return pd.read_excel(xls, None)

def index(response):
    df = read_tables('../sample_data.xlsx')
    visited = []
    with connection.cursor() as cursor:
        # for i in range(len(df['DrugBank'])):
        #     row = df['BindingDB'][df['BindingDB']['drugbank_id'] == df['DrugBank']['drugbank_id'].iloc[i]]
        #     smiles = row['smiles']
        #     cursor.execute("""
        #         INSERT INTO Drug(drugbank_id, drug_name, drug_descr, smiles)
        #         VALUES (%s, %s, %s, %s);""", [df['DrugBank']['drugbank_id'].iloc[i], df['DrugBank']['name'].iloc[i], df['DrugBank']['description'].iloc[i], str(smiles)]
        #     )
        
        # for i in range(len(df['BindingDB'])):
        #     row = df['UniProt'][df['UniProt']['uniprot_id'] == df['BindingDB']['uniprot_id'].iloc[i]]
        #     uniprot_id = row['uniprot_id']
        #     sequence = row['sequence']

        #     if str(uniprot_id) not in visited:
        #         cursor.execute("""
        #             INSERT INTO Target_protein(uniprot_id, sequence, target_name)
        #             VALUES (%s, %s, %s);""", [str(uniprot_id), str(sequence), df['BindingDB']['target_name'].iloc[i]]
        #         )
        #         visited.append(str(uniprot_id))

        # visited = []

        # for i in range(len(df['DrugBank'])):
        #     interactions = []
        #     drugbank_id = df['DrugBank']['drugbank_id'].iloc[i]
        #     interactions.append(df['DrugBank']['drug_interactions'].iloc[i])

        #     for id2 in interactions:
        #         if id2 != '[]':
        #             id2 = id2.replace("\'", "")
        #             id2 = id2.replace("[", "")
        #             id2 = id2.replace("]", "")
        #             id2 = [x.strip() for x in id2.split(',')]
        #             for id1 in id2:
        #                 if (drugbank_id, id1) not in visited:
        #                     cursor.execute("""
        #                         INSERT INTO Interacts(drugbank_id1, drugbank_id2)
        #                         VALUES (%s, %s);""", [str(drugbank_id), str(id1)]
        #                     )
        #                     visited.append((drugbank_id, id1))

        # visited = []

        # for i in range(len(df['SIDER'])):
        #     umlscui = df['SIDER']['umls_cui'].iloc[i]
        #     side_effect_name = df['SIDER']['side_effect_name'].iloc[i]

        #     if umlscui not in visited:
        #         cursor.execute("""
        #             INSERT INTO Side_effects(umlscui, side_effect_name)
        #             VALUES (%s, %s);""", [str(umlscui), str(side_effect_name)]
        #             )
        #         visited.append(umlscui)

        # visited = []

        # for i in range(len(df['SIDER'])):
        #     umlscui = df['SIDER']['umls_cui'].iloc[i]
        #     drugbank_id = df['SIDER']['drugbank_id'].iloc[i]

        #     if (umlscui, drugbank_id) not in visited:
        #         cursor.execute("""
        #             INSERT INTO Has_sider(umlscui, drugbank_id)
        #             VALUES (%s, %s);""", [str(umlscui), str(drugbank_id)]
        #             )
        #         visited.append((umlscui, drugbank_id))        

        # visited = []

        # for i in range(len(df['User'])):
        #     author_name = df['User']['name'].iloc[i]
        #     username = df['User']['user_name'].iloc[i]
        #     institute_name = df['User']['institutions'].iloc[i]
        #     u_password = df['User']['passwords'].iloc[i]

            # if (username, institute_name) not in visited:
            #     cursor.execute("""
            #         INSERT INTO DT_User(author_name, username, institute_name, u_password)
            #         VALUES (%s, %s, %s, %s);""", [str(author_name), str(username), str(institute_name), str(u_password)]
            #         )
            #     visited.append((username, institute_name))
                  

        # visited = []

        # for i in range(len(df['Database Manager'])):
        #     d_username = df['Database Manager']['username'].iloc[i]
        #     d_password = df['Database Manager']['password'].iloc[i]

        #     if d_username not in visited:
        #         cursor.execute("""
        #             INSERT INTO DB_manager(d_username, d_password)
        #             VALUES (%s, %s);""", [str(d_username), str(d_password)]
        #             )
        #         visited.append(d_username)

        visited = []
        for i in range(len(df['BindingDB'])):
            DOI = df['BindingDB']['doi'].iloc[i]
            institute_name = df['BindingDB']['institution']
            authors = [x.strip() for x in df['BindingDB']['authors'].iloc[i].split(';')]
            
            for author in authors:
                if (DOI, author) not in visited:
                    cursor.execute("""
                    INSERT INTO Article(DOI, author_name, institute_name)
                    VALUES (%s, %s, %s);""", [str(DOI), str(author), str(institute_name)]
                    )
                    visited.append((DOI, author))




        # for i in range(len(df['BindingDB'])):
        #     reaction_id = df['BindingDB']['reaction_id'].iloc[i]
        #     if reaction_id not in visited:
        #         drugbank_id = df['BindingDB']['drugbank_id'].iloc[i]
        #         uniprot_id = df['BindingDB']['uniprot_id'].iloc[i]
        #         affinity = df['BindingDB']['affinity_nM'].iloc[i]
        #         measure = df['BindingDB']['measure'].iloc[i]
        #         DOI = df['BindingDB']['doi'].iloc[i]
        #         cursor.execute("""
        #             INSERT INTO Reaction_info(reaction_id, drugbank_id, uniprot_id, affinity, measure, DOI)
        #             VALUES (%s, %s, %s, %s, %s, %s);""", [int(reaction_id), str(drugbank_id), str(uniprot_id), str(affinity), str(measure), str(DOI)]
        #         )               

    return HttpResponse("Rows are successfully inserted.")