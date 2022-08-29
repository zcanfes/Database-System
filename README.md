# Database-System

## Run the Code

```shell
sudo apt-get update
sudo apt-get install postgresql-10.4
sudo -u postgres psql -c "ALTER USER postgres atasoy3 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE dtbank;"
sudo service postgresql start
sudo service postgresql stop
npm start
python manage.py runserver
```
