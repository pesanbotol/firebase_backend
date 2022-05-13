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