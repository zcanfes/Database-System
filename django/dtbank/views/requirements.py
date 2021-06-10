from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from django.urls import reverse
from django.db import connection


class LoginUser(APIView):

    def post(self, request):

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

        return Response(response)


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


class InsertUser(APIView):

    def post(self, request):

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

        return Response(response)


class DeleteUpdateDrug(APIView):

    def delete(self, request):

        id = request.data['id']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    DELETE FROM drug
                        WHERE drugbank_id = %s;
                    """,
                               [str(id)]
                               )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)

    def put(self, request):

        id = request.data['id']
        affinity = request.data['affinity']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE reaction_info
                        SET affinity=%s
                        WHERE drugbank_id=%s;
                    """,
                               [str(affinity), str(id)]
                               )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class DeleteProtein(APIView):

    def delete(self, request):

        id = request.data['id']
        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    DELETE FROM target_protein
                        WHERE uniprot_id = %s;
                    """,
                               [str(id)]
                               )
            response['success'] = True
        except:
            response['success'] = False

        return Response(response)


class Interactions(APIView):

    def get(self, request, id):

        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM interacts
                    WHERE drugbank_id1 = %s;
                    """,
                               [str(id)]
                               )

                rows = cursor.fetchall()

            response['success'] = True
        except:
            response['success'] = False

        return Response(rows)


class SideEffects(APIView):

    def get(self, request, id):

        response = {}

        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT *
                    FROM has_sider HS, side_effects SE
                    WHERE HS.umlscui = SE.umlscui and drugbank_id = %s;
                    """,
                               [str(id)]
                               )

                rows = cursor.fetchall()

            response['success'] = True
        except:
            response['success'] = False

        return Response(rows)
