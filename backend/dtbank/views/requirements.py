from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from django.db import connection


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def login_helper(request):
    username = request.data['username']
    password = request.data['password']
    instituteName = request.data['instituteName']

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT *
            FROM dt_user
            WHERE username = %s AND u_password = %s AND institute_name = %s
        """, [username, password, instituteName])

        row = cursor.fetchone()

    response = {}

    if isinstance(row, tuple) and len(row) > 0:
        response['success'] = True
    else:
        response['success'] = False

    return response


class LoginUser(APIView):

    def post(self, request):
        return Response(login_helper(request))


class LoginManager(APIView):

    def post(self, request):

        username = request.data['username']
        password = request.data['password']

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM db_manager
                WHERE d_username = %s AND d_password = %s
            """, [username, password])

            row = cursor.fetchone()

        response = {}

        if isinstance(row, tuple) and len(row) > 0:
            response['success'] = True
        else:
            response['success'] = False

        return Response(response)


def insertUser_helper(request):
    authorName = request.data['authorName']
    username = request.data['username']
    password = request.data['password']
    instituteName = request.data['instituteName']
    response = {}

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO DT_User(author_name, username, institute_name, u_password)
                VALUES (%s, %s, %s, %s);
                """, [str(authorName), str(username), str(instituteName), str(password)])
        response['success'] = True
    except:
        response['success'] = False

    return response


class InsertUser(APIView):

    def post(self, request):
        return Response(insertUser_helper(request))


class DeleteUpdateDrug(APIView):

    def delete(self, request):
        drugbank_id = request.data['drugbankId']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    DELETE FROM drug
                        WHERE drugbank_id = %s;
                    """, [str(drugbank_id)]
                )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)

    def put(self, request):

        reactionId = request.data['reactionId']
        affinity = request.data['affinity']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE reaction_info
                        SET affinity=%s
                        WHERE reaction_id=%s;
                    """,
                               [str(affinity), str(reactionId)]
                               )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DeleteProtein(APIView):

    def delete(self, request):

        uniprotId = request.data['uniprotId']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    DELETE FROM target_protein
                        WHERE uniprot_id = %s;
                    """,
                               [str(uniprotId)]
                               )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class UpdateContributorsOfPaper(APIView):

    def put(self, request):

        reactionId = request.data['reactionId']
        authorName = request.data['authorName']
        username = request.data['username']
        password = request.data['password']
        instituteName = ""
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT A.institute_name, A.doi
                    FROM reaction_info RI, article A
                    WHERE RI.doi = A.doi and reaction_id = %s
                    """,
                               [str(reactionId)]
                               )

                instituteName, doi = cursor.fetchone()

                request.data['instituteName'] = instituteName
                temp = login_helper(request)

                if not temp['success']:
                    temp2 = insertUser_helper(request)
                    if not temp2['success']:
                        raise Exception({"success": False})

                cursor.execute("""
                    INSERT INTO Article(doi, author_name, institute_name)
                    VALUES (%s, %s, %s);
                """, [str(doi), str(authorName), str(instituteName)])

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM drug
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class ProteinAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM target_protein
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False
        
        return Response(response)


class SideEffectAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM side_effects
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False
        
        return Response(response)


class DrugTargetInteractionAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM reaction_info
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class PaperContributorAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM article
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class UserAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM dt_user
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugNameAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT drug_name
                    FROM drug
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugbankIdAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT drug_name, drugbank_id
                    FROM drug
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugSmilesAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT drug_name, smiles
                    FROM drug
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugDescriptionAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT drug_name, drug_descr
                    FROM drug
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugTargetAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT Dr.drug_name, TP.target_name
                    FROM drug DR, reaction_info RI, target_protein TP
                    WHERE DR.drugbank_id = RI.drugbank_id AND RI.uniprot_id = TP.uniprot_id;
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugSideEffectAll(APIView):

    def get(self, request):
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT Dr.drug_name, SE.side_effect_name
                    FROM drug DR, has_sider HS, side_effects SE
                    WHERE DR.drugbank_id = HS.drugbank_id AND HS.umlscui = SE.umlscui;
                    """)

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractionsOfDrug(APIView):

    def get(self, request, drugbankId):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM interacts
                    WHERE drugbank_id1 = %s;
                    """,
                               [str(drugbankId)]
                               )

                response['data'] = dictfetchall(cursor)
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class SideEffectsOfDrug(APIView):

    def get(self, request, drugbankId):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM has_sider HS, side_effects SE
                    WHERE HS.umlscui = SE.umlscui and drugbank_id = %s;
                    """,
                               [str(drugbankId)]
                               )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractingTargets(APIView):

    def get(self, request, drugbankId):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM reaction_info RI, target_protein TP
                    WHERE RI.uniprot_id = TP.uniprot_id and drugbank_id = %s;
                    """, [str(drugbankId)]
                )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractingDrugs(APIView):

    def get(self, request, uniprotId):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM reaction_info RI, drug D
                    WHERE RI.drugbank_id = D.drugbank_id and uniprot_id = %s;
                    """, [str(uniprotId)]
                )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractingDrugsList(APIView):

    def get(self, request):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT uniprot_id
                    FROM target_protein
                    """
                               )

                uniprotIds = [x[0] for x in cursor.fetchall()]
                data = {key: [] for key in uniprotIds}

                for uniprotId in uniprotIds:
                    cursor.execute("""
                        SELECT drugbank_id
                        FROM reaction_info
                        WHERE %s = uniprot_id
                        """, [str(uniprotId)])
                    data[uniprotId] = [x[0] for x in cursor.fetchall()]

                response['data'] = data

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractingTargetsList(APIView):

    def get(self, request):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT drugbank_id
                    FROM drug
                    """
                               )

                drugbankIds = [x[0] for x in cursor.fetchall()]
                data = {key: [] for key in drugbankIds}

                for drugbankId in drugbankIds:
                    cursor.execute("""
                        SELECT uniprot_id
                        FROM reaction_info
                        WHERE %s = drugbank_id
                        """, [str(drugbankId)])
                    data[drugbankId] = [x[0] for x in cursor.fetchall()]

                response['data'] = data

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DrugsOfSideEffect(APIView):

    def get(self, request, umlscui):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM has_sider HS, drug D
                    WHERE HS.drugbank_id = D.drugbank_id and umlscui = %s;
                    """,
                               [str(umlscui)]
                               )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class SearchDrugs(APIView):

    def get(self, request, keyword):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM drug
                    WHERE drug_descr LIKE %s;
                    """, [f"%{keyword}%"]
                )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class InteractingDrugsLeastSideEffects(APIView):

    def get(self, request, uniprotId):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT DISTINCT D.drugbank_id
                    FROM reaction_info RI, drug D, target_protein TP, has_sider HS
                    WHERE RI.drugbank_id = D.drugbank_id and TP.uniprot_id = RI.uniprot_id 
                    and D.drugbank_id = HS.drugbank_id
                    and TP.uniprot_id = %s;
                    """, [str(uniprotId)]
                )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class PaperList(APIView):

    def get(self, request):

        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM article
                    """
                               )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class FilterInteractingTargets(APIView):

    def get(self, request, drugbankId, measure, min_affinity, max_affinity):
        response = {}
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT uniprot_id, target_name
                    FROM filter_interacting_targets(%s, %s, %s)
                    WHERE drugbank_id = %s;
                    """, [measure, min_affinity, max_affinity, drugbankId]
                )

                response['data'] = dictfetchall(cursor)

            response['success'] = True
        except:
            response['success'] = False

        return Response(response)
