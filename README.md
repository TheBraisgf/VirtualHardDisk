
# 💾 Virtual Hard Disk 💽

Welcome to the Virtual Hard Disk project! 
This project is a backend API developed as part of the Hack a Boss full-stack bootcamp. 

It allows users to easily register and log in, upload and download files, and create and delete folders. 

In February, we will be building a frontend using React to complete the project. 

The Virtual Hard Disk is a powerful tool that provides a secure and convenient way to manage your virtual storage needs. 

Whether you're a student, a professional, or just someone looking for an easy way to organize your files and folders, the Virtual Hard Disk has you covered. 

We can't wait to see what you can do with it!
## 🧠 Knowledge used:
- **Backend development**: Building the server-side of a web application
- **RESTful APIs**: A set of conventions for creating APIs that are scalable and maintainable
- **User authentication and authorization**: Techniques for ensuring that only authorized users can access certain parts of an application
- **File storage and management**: Techniques for storing and organizing files and folders in a virtual environment
- **Database design and querying**: Designing and interacting with a database using MySQL
- **Web security**: Best practices for keeping an application and its users safe from security vulnerabilities
- **Data validation**: Ensuring that the data being stored in the database is accurate and conforms to certain standards
- **Asynchronous programming**: Writing code that can perform tasks concurrently or in a non-blocking manner
- **Testing**: Using tools like Postman to test the functionality of your API and ensure it is working correctly



## Deployment

To deploy this project you must first create a MySQL database with the name you have given it in the .env file


```bash
  CREATE DATABASE MYSQL_BBDD
```
Now you must run the following command to start the database and create the tables
```bash
  npm run initDB
```
Finally run the server:
```bash
  npm run dev
```


## API Reference
We have included the Postman file for the api tests but these are the enpoints and the parameters that we must pass.
### Users Requests

#### Register New User

```http
  POST /users
```

| Body     |
:----------------------- | 
| `Username, email, password` | 


#### Login user and get the Token

```http
  GET /users/login
```
| Body     |
| :----------------------- | 
| `email, password` | 



#### Edit user information

```http
  PUT /users/edit
```
| Headers | Body     |
| :-------- | :----------------------- | 
| `User_Token` | `username, photo, bio` | 





### Files Requests

#### Upload File

```http
  POST /files
```
| Headers | Body     |
| :-------- | :----------------------- | 
| `User_Token` | `file, folder` | 


#### List of files

```http
  GET /files
```
| Headers |
| :-------- |
| `User_Token` |


#### Return a file

```http
  GET /files/:idFile
```
| Headers |
| :-------- |
| `User_Token` |

#### Return a file from a specific folder

```http
  GET /files/:folder/:idFile
```
| Headers |
| :-------- |
| `User_Token` |


#### Removes a file

```http
  DELETE /files/:idFile
```
| Headers | Body     |
| :-------- | :----------------------- | 
| `User_Token` | `folderName` | 



#### Create folder

```http
  POST /files/newfolder
```
| Headers | Body     |
| :-------- | :----------------------- | 
| `User_Token` | `newFolderName` | 


#### Create folder

```http
  DELETE /folder
```
| Headers | Body     |
| :-------- | :----------------------- | 
| `User_Token` | `removeFolderName` |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MYSQL_HOST`

`MYSQL_USER`

`MYSQL_PASS`

`MYSQL_BBDD`

`ADMIN_EMAIL`

`ADMIN_PASS`

`PORT`

`SECRET`

`ROOT`



## Feedback

If you have any feedback, please reach out to us at braisgf@gmail.com


# 💡Authors 




## [![linkedin](https://img.shields.io/badge/TheBraisGF-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheBraisgf)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/braisgf/)

[![codewars](https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white)](https://www.codewars.com/users/Braisgf)

[![instabio](https://img.shields.io/badge/SOCIAL_MEDIA-FFA500?style=for-the-badge&logo=rss&logoColor=white)](https://instabio.cc/3030409IOuIr3)




## [![linkedin](https://img.shields.io/badge/pabloberu-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pabloberu)
