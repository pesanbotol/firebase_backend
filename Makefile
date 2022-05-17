clearport:
	npx kill-port 9099 5001 8190 8103 9199

emulate:
	firebase emulators:start

s:
	make clearport && make emulate

joi2ts:
	cd functions && npm run joi2ts

shell:
	firebase functions:shell

typesenselocal:
	mkdir /tmp/typesense-data ; docker run -p 8108:8108 -v/tmp/data:/data typesense/typesense:0.22.2 --data-dir /data --api-key=Hu52dwsas2AdxdE
