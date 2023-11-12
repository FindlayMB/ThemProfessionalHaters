import mysql.connector


def connectToDatabase():
    databaseConnection = mysql.connector.connect(
        host="127.0.0.1",  # update to host ip address
        user="Findlay",  # Update to user for database
        password="helloworld",  # Update to password for database
        database="CLEAN_TO_GREEN",
    )
    return databaseConnection


def main():
    databaseConnection = connectToDatabase()


if __name__ == "__main__":
    main()
