FROM python:3.9.9

WORKDIR /app-worker
COPY . .

RUN python -m pip install -r requirements.txt

CMD ["python3", "main.py"]