clearport:
	npx kill-port 9099,5001,8182,8086,9199

emulate:
	firebase emulators:start

joi2ts:
	cd functions && npm run joi2ts

shell:
	firebase functions:shell