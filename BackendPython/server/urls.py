

"""
urls.py
URL dispatch route mappings and error handlers
"""
# Utils
from flask import render_template,json
# App
from server import app
from server.views.home.home_getpublications import HomeGetPublications
#   Publics 
from server.views.public.public_say_hello import PublicSayHello
#   Home
from server.views.home.home_index import HomeIndex
#   Students
from server.views.student.student_index import StudentIndex
from server.views.student.student_login import StudentLogin
from server.views.student.student_register import StudentRegister
from server.views.student.student_addfriend import StudentAddFriend
from server.views.student.student_acceptfriend import StudentAcceptFriend
from server.views.student.student_getRequest import StudentRequest


# PUBLIC
app.add_url_rule('/', 'public_say_hello', view_func=PublicSayHello.as_view('public_say_hello'))

# HOME
app.add_url_rule('/home/', 'home_index', view_func=HomeIndex.as_view('home_index'))
app.add_url_rule('/home/upload', 'home_upload', view_func=HomeIndex.as_view('home_upload'))
app.add_url_rule('/home/delete', 'home_delete', view_func=HomeIndex.as_view('home_delete'))
app.add_url_rule('/home/edit', 'home_edit', view_func=HomeIndex.as_view('home_edit'))
app.add_url_rule('/home/getPublicationsUser', 'home_getpublications', view_func=HomeGetPublications.as_view('home_getpublications'))


# STUDENTS
app.add_url_rule('/student/', 'student_index', view_func=StudentIndex.as_view('student_index'))
app.add_url_rule('/student/login', 'student_login', view_func=StudentLogin.as_view('student_login'))
app.add_url_rule("/student/register",'student_register', view_func=StudentRegister.as_view("student_register"))
app.add_url_rule('/student/addFriend', 'student_addfriend', view_func=StudentAddFriend.as_view('student_addfriend'))
app.add_url_rule('/student/aceptFriend', 'student_acceptfriend', view_func=StudentAcceptFriend.as_view('student_acceptfriend'))
app.add_url_rule('/student/getRequestFriend', 'student_getrequestfriend', view_func=StudentRequest.as_view('student_acceptfriend'))
app.add_url_rule('/student/getFriends', 'student_getfriends', view_func=StudentAcceptFriend.as_view('student_acceptfriend'))
app.add_url_rule('/student/getNoFriends', 'student_getnotfriends', view_func=StudentAcceptFriend.as_view('student_acceptfriend'))


