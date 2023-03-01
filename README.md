# Research Support Tool API

Research support tool API és un backend programat en JavaScript per interactuar amb una base de dades de MongoDB. Aquesta API proporciona serveis per a suportar la recerca científica, incloent-hi l'emmagatzematge de dades i la gestió d'usuaris.

## Instal·lació

Per instal·lar el projecte, cal seguir aquests passos:

1.  Clonar el repositori amb `git clone https://github.com/research-support-tool`.
2.  Executar `npm install` per instal·lar les dependències necessàries.
3.  Configurar la connexió amb la base de dades editant afegint un fitxer `.env` amb la informació de la connexió de MongoDB. Aquest fitxer hauria de tenir un format com el següent:
```
USER="usuariMongo"
PASSWORD="passwordMongo"
MONGO_URI="mongodb+srv://connectionString:mongo.net/?retryWrites=true&w=majority"
```
4.  Executar `npm start` per iniciar el servidor.

## Ús

Aquesta API proporciona diversos endpoints per interactuar amb la base de dades. Per exemple, per obtenir una llista de journals, cal fer una petició GET a `/journals`. 
La documentació relacionada amb aquest backend es pot trobar fent una query a `/doc`, allà trobareu un Swagger UI on provar els diferents endpoints.

## Contribució

Si vols contribuir al projecte, cal seguir aquests passos:

1.  Fer un fork del repositori.
2.  Clonar el teu fork amb `git clone https://github.com/research-support-tool`.
3.  Crear una branca per a la teva contribució amb `git checkout -b nomdebranca`.
4.  Realitzar els canvis necessaris.
5.  Fer commit dels canvis amb un missatge descriptiu.
6.  Pujar els canvis al teu fork amb `git push origin nomdebranca`.
7.  Fer una pull request al repositori original.

## Llicència

Aquest projecte està sota la llicència GNU GPL v3 o posterior.