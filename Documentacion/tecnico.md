# <center>LOCAL STORAGE</center>

## <center> OBJETIVOS DE LOCAL STORAGE </center>
* Conocer la arquitectura del proyecto.
* Utilizar diferentes servicios de AWS.
* Implementar tecnologías de la nube a un entorno real.

## <center> REQUERIMIENTOS DEL SISTEMA </center>
#### SISTEMA OPERATIVO COMPATIBLE:
* Ubuntu 20.04, 22.04 LTS
* Windows 10, 11
#### MEMORIA RAM:
* Minimo 4GB de RAM
#### LENGUAJES DE PROGRAMACION:
* Javascript
* Python
* SQL
#### BASE DE DATOS:
* Mysql
#### IDE DE PROGRAMACION:
* Visual Studio Code
* Workbench para el manejo de la base de datos.
<br><br>

---
## <center> TECNOLOGÍAS UTILIZADAS </center>
<br>

|TECNOLOGÍA|DESCRIPCION|IMAGEN|
|----------|-----------|------|
|AWS [AMAZON WEB SERVICES]| <p style='text-align: justify;'>Es la plataforma en la nube más adoptada y completa en el mundo, que ofrece más de 200 servicios integrales de centros de datos a nivel global. .</p> |![logo aws](https://res.cloudinary.com/ingenieria/image/upload/v1663299462/semi1/proyecto1/5-1_ws2h1n.png)|
|DOCKER|<p style='text-align: justify;'>Docker es un proyecto de código abierto para automizar la implementacion de aplicaciones como contenedores portátiles y autosuficientes que se pueden ejecutar en la nube o de manera local.</p>|![logo docker](https://res.cloudinary.com/ingenieria/image/upload/v1661130529/sopes1/practica1/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d_tns73c.png)|
|DOCKER-COMPOSE|<p style='text-align: justify;'>Docker Compose es una herramienta dedicada a la orquestación local de dockers, es decir, se utiliza para definir y ejecutar las aplicaciones Docker de varios contenedores.</p>|![logo docker compose](https://res.cloudinary.com/ingenieria/image/upload/v1661130654/sopes1/practica1/docker-compose-logo_mjzegx.png)|
|MYSQL|<p style='text-align: justify;'>MySQL es un sistema de gestión de bases de datos relacionales de código abierto (RDBMS, por sus siglas en inglés) con un modelo cliente-servidor. RDBMS es un software o servicio utilizado para crear y administrar bases de datos basadas en un modelo relacional.</p>|![logo mysql](https://res.cloudinary.com/ingenieria/image/upload/v1662773240/sopes1/practica2/mysql_cfkwrs.gif)|
|REACT|<p style='text-align: justify;'>React es una librería open source de JavaScript para desarrollar interfaces de usuario. Fue lanzanda en 2013 por Facebook.</p>|![logo react](https://res.cloudinary.com/ingenieria/image/upload/v1661131017/sopes1/practica1/1_80dwUDuQ8m6jifVXUA_4JQ_vny9ee.png)|
|NODE JS|<p style='text-align: justify;'>Node.js es un entorno de tiempo de ejecución de JavaScript (de ahí su terminación en .js haciendo alusión al lenguaje JavaScript). Este entorno de tiempo de ejecución en tiempo real incluye todo lo que se necesita para ejecutar un programa escrito en JavaScript.</p>|![logo fiber](https://res.cloudinary.com/ingenieria/image/upload/v1662773663/sopes1/practica2/1366_2000_lwh7ug.jpg)|
|FLASK|<p style='text-align: justify;'>Flask es un “micro” Framework escrito en Python y concebido para facilitar el desarrollo de Aplicaciones Web bajo el patrón MVC.</p>|![logoflask](https://res.cloudinary.com/ingenieria/image/upload/v1663307476/semi1/proyecto1/flask_main_page-1_xlfl3m.png)|
---
<br>

## <center> COMPONENTES DE LOCAL STORAGE </center> 
### **AWS**
1. Usuario IAM: El usuario que se utilizó para elaborar LOCAL STORAGE fue el usuario root.<br><br>
1. Bucket: El servicio de Bucket fue utilizado en LOCAL STORAGE para almacenar los archivos que el usuario cargo. La configuración del Bucket incia colocandole un nombre la mismo, posteriomente se especifica la region, se desactiva el control de versiones del bucket y se desactiva el cifrado del lado de servidor.<br><br>
![bucket](https://res.cloudinary.com/ingenieria/image/upload/v1663313153/semi1/proyecto1/ba8f1769-040b-4510-8d2c-c22d26211ef3_v2rxsk.jpg)
![bucket1](https://res.cloudinary.com/ingenieria/image/upload/v1663313283/semi1/proyecto1/f0c7d361-70f2-46a0-a76c-59361addb38a_sw7e41.jpg)
1. EC2 [Elastic Compute Cloud]: <p style='text-align: justify;'>Permite a los usuarios alquilar computadores virtuales en los cuales pueden ejecutar sus propias aplicaciones. La configuración que se debe de realizar para crear una ec2 es la siguiente: Primero se debe de especificar el Nombre que tendrá la ec2, se selecciona la imagen que se va a instalar, se especifica el tipo de instancia y se especifican las llaves que tendra la instancia.</p> <br>
![ec2](https://res.cloudinary.com/ingenieria/image/upload/v1663307216/semi1/proyecto1/631b82bb-6aa4-46ab-8824-8550742dbc28_ofot3x.jpg)
![ec21](https://res.cloudinary.com/ingenieria/image/upload/v1663307310/semi1/proyecto1/d7f34720-1565-457e-8c91-46e81851a3f6_km4lug.jpg)<br><br>
1. LOAD BALANCER: Toma las solicitudes de los clientes y las distribuye entre los detinos de un grupo destino. Para configurar el Load Balancer se debe de especificar el grupo destino, que es en donde se va a dirigir las peticiones. Se coloca la información basica como el nombre, un esquema, un tipo de direccióon de IP. Se proporciona información de la red y de los oyentes. Al finalizar, se realiza una prueba para verificar que la configuración se ha completado.<br><br>
![loadbal](https://res.cloudinary.com/ingenieria/image/upload/v1663313960/semi1/proyecto1/199c88ef-dd91-447a-bc4c-1bce9d3b4aa1_djo7hg.jpg)

---
### **FRONTEND**
<p style='text-align: justify;'>Se realizo el frontend con react. Para cada uno de los endpoints que consume la aplicación se creo una interfaz grafica para que el usuario pueda interactuar de una manera más intuitiva. Las interfaces, metodos y archivos son los siguientes:</p>


#### 1. Endpoint LOGIN
<p style='text-align: justify;'>Para consumir el Endpoint de Login se creo un archivo con el nombre login.jsx En el cual se tiene el siguiente metodo asincrono que consume el endpoint de login del backend, permitiendo de esa manera al usuario ingresar sus credenciales para iniciar sesion. Si el usuario ingreso de manera correcta sus credenciales, se retorna el id del usuario el cual es almacenado en una Cookie para poder utilizarlo en las siguientes actividades que realice el usuario. Por lo contrario, si el usuario no ingreso sus credenciales correctamente, se retorna un -1 en donde se muestra un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663308284/semi1/proyecto1/Captura_desde_2022-09-16_00-04-20_wikkgw.png)

<p style='text-align: justify;'>El componente que retorna este archivo es el siguiente:</p>

![logincom](https://res.cloudinary.com/ingenieria/image/upload/v1663308483/semi1/proyecto1/Captura_desde_2022-09-16_00-07-54_htce5a.png)

#### 2. Endpoint REGISTRAR
<p style='text-align: justify;'>Para consumir el Endpoint de Registrar usuario se creo un archivo con el nombre registro.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de registro del backend, permitiendo de esa manera al usuario ingresar sus credenciales para registrarse en LOCAL STORAGE. Si el usuario no ingreso sus credenciales correctamente, se retorna un -1 en donde se muestra un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663308829/semi1/proyecto1/Captura_desde_2022-09-16_00-13-31_iwy1o9.png)

#### 3. Endpoint SUBIR ARCHIVO
<p style='text-align: justify;'>Para consumir el Endpoint de Subir Archivo se creo un archivo con el nombre subir.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de subir archivo del backend, permitiendo de esa manera al usuario ingresar la información del archivo que desea almacenar en LOCAL STORAGE. Si el usuario no ingreso los datos de manera correcta, se retorna un -1 en donde se muestra un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309024/semi1/proyecto1/Captura_desde_2022-09-16_00-16-51_kzpqxy.png)

#### 4. Endpoint EDITAR ARCHIVO
<p style='text-align: justify;'>Para consumir el Endpoint de Editar Archivo se creo un archivo con el nombre editar.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de editar archivo del backend, permitiendo de esa manera al usuario pueda buscar el archivo que desea actualizar la información. Si el usuario no ingreso los datos de manera correcta, se retorna un -1 en donde se muestra un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309239/semi1/proyecto1/Captura_desde_2022-09-16_00-20-29_ryeyrs.png)

#### 5. Endpoint ELIMINAR ARCHIVO
<p style='text-align: justify;'>Para consumir el Endpoint de Eliminar Archivo se creo un archivo con el nombre eliminar.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de eliminar archivo del backend, permitiendo de esa manera al usuario pueda buscar el archivo que desea eliminar. Si ocurrió un problema al eliminar el archivo se retorna un -1 junto con un mensajede error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309420/semi1/proyecto1/Captura_desde_2022-09-16_00-23-34_n0mqhy.png)

#### 6. Endpoint OBTENER ARCHIVOS PUBLICOS
<p style='text-align: justify;'>Para consumir el Endpoint de Obtener Archivos se creo un archivo con el nombre tabla.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de obtener archivos del backend, permitiendo de esa manera al usuario pueda visualizar los archivos que ha cargado y son publicos.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309665/semi1/proyecto1/Captura_desde_2022-09-16_00-27-35_cn1znr.png)

#### 7. Endpoint OBTENER ARCHIVOS PRIVADOS
<p style='text-align: justify;'>Para consumir el Endpoint de Obtener Archivos se creo un archivo con el nombre tabla1.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de obtener archivos del backend, permitiendo de esa manera al usuario pueda visualizar los archivos que ha cargado y son privados.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309717/semi1/proyecto1/Captura_desde_2022-09-16_00-28-31_mppt9v.png)

#### 8. Endpoint OBTENER AGREGAR AMIGO
<p style='text-align: justify;'>Para consumir el Endpoint de Agregar Amigo se creo un archivo con el nombre tabla2.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de agregar amigo del backend, permitiendo de esa manera al usuario pueda hacer nuevos amigos con los cuales compartir archivos. Si al momento de enviar la solicitud hubo problemas, se retorna un -1 junto con un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663309854/semi1/proyecto1/Captura_desde_2022-09-16_00-30-48_pfsqyp.png)

#### 9. Endpoint ACEPTAR AMIGO
<p style='text-align: justify;'>Para consumir el Endpoint de Aceptar Amigo se creo un archivo con el nombre tabla4.jsx. En el cual se tiene el siguiente metodo asincrono que consume el endpoint de aceptar amigo del backend, permitiendo de esa manera al usuario pueda agregar amigos a su lista de amigos. Si al momento de aceptar la solicitud hubo problemas, se retorna un -1 junto con un mensaje de error.</p>

![loginend](https://res.cloudinary.com/ingenieria/image/upload/v1663310017/semi1/proyecto1/Captura_desde_2022-09-16_00-33-30_xjja3k.png)


---
### **BACKEND**
<p style='text-align: justify;'>Se realizo dos backends ya que se va a utilizar un balanceador de carga, por lo que así hay dos servicios en los cuales distribuir la carga. Estos backends se realizaron en NodeJs y en Python. 
A continuación se van a explicar los endpoints utilizados para cada una de las peticiones:</p>

#### RUTA HOME 
1. Endpoint Subir Archivo:<br>
![subir](https://res.cloudinary.com/ingenieria/image/upload/v1663305185/semi1/proyecto1/Captura_desde_2022-09-15_23-12-02_eg4cwy.png)
![subir1](https://res.cloudinary.com/ingenieria/image/upload/v1663305238/semi1/proyecto1/Captura_desde_2022-09-15_23-13-50_ttrjxe.png)
1. Endpoint Eliminar Archivo:<br>
![eliminar](https://res.cloudinary.com/ingenieria/image/upload/v1663305320/semi1/proyecto1/Captura_desde_2022-09-15_23-15-11_jw3m0y.png)
![eliminar1](https://res.cloudinary.com/ingenieria/image/upload/v1663305352/semi1/proyecto1/Captura_desde_2022-09-15_23-15-45_khw30a.png)
1. Endpoint Editar Archivo:<br>
![editar](https://res.cloudinary.com/ingenieria/image/upload/v1663305393/semi1/proyecto1/Captura_desde_2022-09-15_23-16-27_ubvgno.png)
![editar1](https://res.cloudinary.com/ingenieria/image/upload/v1663305412/semi1/proyecto1/Captura_desde_2022-09-15_23-16-46_p90uba.png)
1. Endpoint Visualizar Archivo:<br>
![ver](https://res.cloudinary.com/ingenieria/image/upload/v1663305453/semi1/proyecto1/Captura_desde_2022-09-15_23-17-28_zkvdet.png)
![ver1](https://res.cloudinary.com/ingenieria/image/upload/v1663305493/semi1/proyecto1/Captura_desde_2022-09-15_23-18-07_jl3abl.png)

#### RUTA STUDENT
1. Endpoint Login:<br>
![login](https://res.cloudinary.com/ingenieria/image/upload/v1663305903/semi1/proyecto1/Captura_desde_2022-09-15_23-24-55_qpmik9.png)
![login1](https://res.cloudinary.com/ingenieria/image/upload/v1663305980/semi1/proyecto1/Captura_desde_2022-09-15_23-26-07_vuumfn.png)
1. Endpoint Registro:<br>
![registro](https://res.cloudinary.com/ingenieria/image/upload/v1663306351/semi1/proyecto1/Captura_desde_2022-09-15_23-32-24_gussh9.png)
![registro1](https://res.cloudinary.com/ingenieria/image/upload/v1663306390/semi1/proyecto1/Captura_desde_2022-09-15_23-33-02_yku7sg.png)
1. Endpoint Agregar Amigo:<br>
![addamigo](https://res.cloudinary.com/ingenieria/image/upload/v1663306418/semi1/proyecto1/Captura_desde_2022-09-15_23-33-31_szkszw.png)
![addamigo1](https://res.cloudinary.com/ingenieria/image/upload/v1663306444/semi1/proyecto1/Captura_desde_2022-09-15_23-33-58_k6psqu.png)
1. Endpoint Aceptar Amigo:<br>
![aceptaramigo](https://res.cloudinary.com/ingenieria/image/upload/v1663306813/semi1/proyecto1/Captura_desde_2022-09-15_23-40-06_kqztqz.png)
![aceptaramigo1](https://res.cloudinary.com/ingenieria/image/upload/v1663306840/semi1/proyecto1/Captura_desde_2022-09-15_23-40-34_miuqgr.png)
1. Endpoint Obtener Solicitudes de Amistad:<br>
![solicitud](https://res.cloudinary.com/ingenieria/image/upload/v1663306866/semi1/proyecto1/Captura_desde_2022-09-15_23-40-59_zwpclz.png)
![solicitud1](https://res.cloudinary.com/ingenieria/image/upload/v1663306893/semi1/proyecto1/Captura_desde_2022-09-15_23-41-26_rkd4ii.png)
1. Endpoint Obtener Amigos:<br>
![veramigos](https://res.cloudinary.com/ingenieria/image/upload/v1663306917/semi1/proyecto1/Captura_desde_2022-09-15_23-41-50_a22mi0.png)
![veramigos1](https://res.cloudinary.com/ingenieria/image/upload/v1663306946/semi1/proyecto1/Captura_desde_2022-09-15_23-42-20_orfty0.png)
1. Endpoint Obtener No Amigos:<br>
![vernoamigos](https://res.cloudinary.com/ingenieria/image/upload/v1663306988/semi1/proyecto1/Captura_desde_2022-09-15_23-42-47_twu8f6.png)
![vernoamigos1](https://res.cloudinary.com/ingenieria/image/upload/v1663307027/semi1/proyecto1/Captura_desde_2022-09-15_23-43-41_yo0ocx.png)

---
### **BASE DE DATOS**
<p style='text-align: justify;'>La base de datos fue realizada en MySQL, el nombre de la base de datos es **Proyecto1**. Las tablas utilizadas para almacenar la información son las siguientes:</p>

1. USUARIO: Almacena la información del usuario.<br>
![usuario](https://res.cloudinary.com/ingenieria/image/upload/v1663302217/semi1/proyecto1/Captura_desde_2022-09-15_22-23-14_qdhsyj.png)
1. PUBLICATION: Almacena la información del los archivos publicados por el usuario.<br>
![publication](https://res.cloudinary.com/ingenieria/image/upload/v1663302305/semi1/proyecto1/Captura_desde_2022-09-15_22-24-57_bhrpo6.png)
1. FRIEND: Almacena las llaves primarias entre amigos.<br>
![friend](https://res.cloudinary.com/ingenieria/image/upload/v1663302379/semi1/proyecto1/Captura_desde_2022-09-15_22-26-13_mhuo3h.png)

Los procedures utilizados para almacenar la información son los siguientes:
1. newUser: Este procedure almacena un nuevo usuario a la base de datos.<br>
![nuevo_usuaro](https://res.cloudinary.com/ingenieria/image/upload/v1663302515/semi1/proyecto1/Captura_desde_2022-09-15_22-28-28_mmtjdo.png)
1. loginUser: Este procedure realiza el ingreso del usuario a la aplicación.<br>
![login](https://res.cloudinary.com/ingenieria/image/upload/v1663303105/semi1/proyecto1/Captura_desde_2022-09-15_22-37-41_oowrkk.png)
1. addFriend: Este procedure realiza agregar un nuevo amigo.<br>
![addfriend](https://res.cloudinary.com/ingenieria/image/upload/v1663303360/semi1/proyecto1/Captura_desde_2022-09-15_22-39-40_ntiyt4.png)
1. getRequestF: Este procedure obtiene las solicitudes de amistad.<br>
![getRequestF](https://res.cloudinary.com/ingenieria/image/upload/v1663303444/semi1/proyecto1/Captura_desde_2022-09-15_22-43-56_btptfw.png)
1. aceptFriend: Este procedure realiza la confirmación de amistad.<br>
![aceptFriend](https://res.cloudinary.com/ingenieria/image/upload/v1663303521/semi1/proyecto1/Captura_desde_2022-09-15_22-45-11_uqmeej.png)
1. getFriends: Este procedure muestra todos los amigos que tiene el usuario.<br>
![getFriends](https://res.cloudinary.com/ingenieria/image/upload/v1663303587/semi1/proyecto1/Captura_desde_2022-09-15_22-46-21_zxy18x.png)
1. newPublication: Este procedure realiza una nueva publicación.<br>
![newPublication](https://res.cloudinary.com/ingenieria/image/upload/v1663303668/semi1/proyecto1/Captura_desde_2022-09-15_22-47-41_iystza.png)
1. deletePublication: Este procedure realiza la eliminación de una publicación.<br>
![deletePublication](https://res.cloudinary.com/ingenieria/image/upload/v1663303767/semi1/proyecto1/Captura_desde_2022-09-15_22-49-20_awx9lf.png)
1. editPublication: Este procedure reliza la edición de una publicación.<br>
![editPublication](https://res.cloudinary.com/ingenieria/image/upload/v1663303838/semi1/proyecto1/Captura_desde_2022-09-15_22-50-30_eictvp.png)
1. getDataUser: Este procedure obtiene todos los archivos que ha publicado el usuario.<br>
![getDataUser](https://res.cloudinary.com/ingenieria/image/upload/v1663303906/semi1/proyecto1/Captura_desde_2022-09-15_22-51-31_bqauye.png)
1. getNames: Este procedure obtiene los nombres de lo usuarios.<br>
![getNames](https://res.cloudinary.com/ingenieria/image/upload/v1663303989/semi1/proyecto1/Captura_desde_2022-09-15_22-53-01_h67k4w.png)
1. getUsers: Este procedure obtiene los username de los usuarios.<br>
![getUsers](https://res.cloudinary.com/ingenieria/image/upload/v1663305155/semi1/proyecto1/Captura_desde_2022-09-15_22-53-50_vqbc4u.png)


---
## <center> CONCLUSIONES </center> 
* <p style='text-align: justify;'>Al tener una breve explicación de cada uno de los metodos que componen a LOCAL STORAGE se puede comprender su funcionamiento, por lo que si en el futuro presenta fallas se pueden resolver.</p>
* <p style='text-align: justify;'>AWS ofrece varios servicios en la nube que se puede utilizar en diversidad de proyectos, haciendo que estos sean más eficientes, completos y competitivos con el mercado.</p>
* <p style='text-align: justify;'>La fácil configuración de los servicios de AWS se puede realizar proyectos de alta calidad en poco tiempo.</p>
