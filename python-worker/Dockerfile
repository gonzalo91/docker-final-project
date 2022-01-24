FROM python:3.9.8


RUN groupadd -g 1000 app
RUN useradd -u 1000 -ms /bin/bash -g app app

USER app

WORKDIR /home/app/app-worker

COPY . .
# Copy existing application directory permissions
COPY --chown=app:app . /home/app/app-worker

RUN python -m pip install -r requirements.txt

CMD ["python3", "main.py"]