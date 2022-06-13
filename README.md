# Backend for Trace (Pesan Botol Bangkit Capstone 2022 Project)
Main third party service/library used: 
- Firestore as database
- Typesense as search engine and geolocation query service
- Cloud Function (HTTPS Callable Functions) as main endpoint framework
- JOI as input (And output) validation library
- Cloud Storage as unstructured data storage container

A first party ML model deployment is needed, the ML deployment is used using HTTP endpoint pointed in ENV VAR as `ML_NUDITY_ENDPOINT` and `ML_LANDMARK_ENDPOINT`

The two model are used as follows:
- Nudity model for checking images and media uploaded into the cloud storage is _safe_ as in, not contain sexual, pornographic content
- Landmark model for checking uploaded image in missiob submission as valid photo of landmark in a designated mission area
