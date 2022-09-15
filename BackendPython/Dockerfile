FROM python

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
RUN echo "es_ES.UTF-8 UTF-8" >> /etc/locale.gen
RUN ln -fs /usr/share/zoneinfo/CET /etc/localtime

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV HOST="0.0.0.0"
ENV PORT="3000"
COPY . /usr/src/app
WORKDIR /usr/src/app

#RUN pip install -U pip setuptools wheel && \
RUN    pip install -r requirements/requirements.txt

# Correr NodeJS
CMD ["python", "run.py"]