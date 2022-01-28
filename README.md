# imageProcessing
## overview 
This is an API that can be used in two different ways. The first, as a simple placeholder API that allows us to place images into our frontend with the size set via url parameters. The second use case is as a library to serve properly scaled versions of our images to the frontend to reduce page load size.
## scripts
### first install all pakage 
 > Install: npm install
### build
 > Build: npm run build
### start server dev 
 > npm run start 
### production build
 > npm run start_prod
### test code
 > npm run test 
### eslint 
 > npm run lint 
### prettier for code 
 > npm run format

## Usage 
this server will listen in port 3000 
## end points 

> http://localhost:3000/api/images
### show image 
> http://localhost:3000/api/images?filename=fjord
### resize the images 
> http://localhost:3000/api/images?filename=fjord&width=200&height=200

## Notes
image in utilities files
 > utilities/images
image thumb in 
 > utitlities/Thumb_Path
