# Progetto per il corso di Tecnologie Web

## Tecnologie Utilizzate

- **Backend**: Django con Django REST Framework
- **Frontend**: Next.js

## Backend: Django con Django REST Framework

### Descrizione

[Django](https://www.djangoproject.com/) è un framework web ad alto livello scritto in Python che incoraggia lo sviluppo rapido e il design pulito e pragmatico. È utilizzato per la creazione di applicazioni web robuste e scalabili.

[Django REST Framework](https://www.django-rest-framework.org/) è una potente libreria per la creazione di API web usando Django. Fornisce un set di strumenti per la serializzazione dei dati, la validazione, l'autenticazione, l'autorizzazione e molto altro, rendendo la creazione di API web con Django un processo efficiente e flessibile.

### Avvio del Server

Per avviare il server backend:

1. Assicurati di avere Python installato sul tuo sistema.
2. Naviga nella directory del progetto backend (`backend/appbackend/`).
3. Esegui il comando `pipenv install` per creare un ambiente virtuale e installare le dipendenze del progetto.
4. Esegui il comando `pipenv shell` per attivare l'ambiente virtuale.
5. Esegui il comando `python manage.py runserver` per avviare il server Django.
6. Il server sarà disponibile all'indirizzo `http://127.0.0.1:8000/`.

### Creazione superuser e prodotti casuali

Per creare un superuser

1. lanciare da riga di comando `python manage.py createsuperuser`
2. inserire username e password

Per creare prodotti casuali

1. Guardare le funzioni `delete_all_products()`, `create_random_products(num_products=10)` nel file `initcmds.py`.
2. La funzione `delete_all_products()` elimina tutti i prodotti nel database.
3. La funzione `create_random_products(num_products=10)` crea 10 prodotti casuali nel database.
4. Le funzioni vengono chiamate una sola volta all'avvio del server Django, all'interno del file `appbackend/urls.py`.
5. Vengono eliminati tutti i prodotti e creati 10 nuovi prodotti casuali ogni volta che il server viene riavviato. Per impedire che ciò accada, una volta avviato il server commentare le due funzioni.


## Frontend: Next.js

### Descrizione

[Next.js](https://nextjs.org/) è un framework React che permette di costruire applicazioni web moderne con funzionalità avanzate come il rendering server-side, il routing client-side, la generazione di pagine statiche e molto altro.

### Avvio del Server

Per avviare il server frontend:

1. Assicurati di avere Node.js e npm installati sul tuo sistema.
2. Se non li hai installati, consiglio di guardare [NVM](https://github.com/nvm-sh/nvm)
3. Naviga nella directory del progetto frontend (`frontend/appfrontend/`).
4. Esegui il comando `npm install` per installare le dipendenze del progetto.
5. Esegui il comando `npm run build` per creare i file statici per il server Next.js.
6. Esegui il comando `npm run start` per avviare il server Next.js.
7. Il server sarà disponibile all'indirizzo `http://localhost:3000/`.


# Dominio per i Cookie di Sessione

Poiché Django utilizza `127.0.0.1` come dominio, per mantenere i cookie di sessione tra il frontend e il backend, assicurati che anche il frontend Next.js utilizzi lo stesso dominio, quindi collegati al server Next.js utilizzando `http://127.0.0.1:3000/`.
