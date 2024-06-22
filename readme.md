
![dockarize-nodejs-application.png](https://github.com/JavaScriptForEverything/dockerizing-nodejs-application/blob/main/public/images/dockarize-nodejs-application.png)



## Dockering 

- Node (nodemon) live reload
- Browser hot-reload (livereload, connect-livereload)
- MongoDB (mongoose) Database


#### Dockering Nodejs application With HOT-Reload

```
$ docker container run -d --name mongodb -p 27017:27017 mongo
```

```
$ docker image build -t node-app .
```

```
$ docker container run \
	-d \
	--rm \
	--name node-app \
	-v `pwd`:/app \
	-p 5000:5000 \
	-p 35729:35729 \
	--link mongodb
	--env-file .env \
	node-app:latest
```


## docker compose 
#### docker compose for mull-stack nodejs app with hot-reload

```
$ docker compose build
$ docker compose up
```
