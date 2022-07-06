cd frontend
go install github.com/shurcooL/vfsgen/cmd/vfsgendev@latest
go get -u github.com/shurcooL/vfsgen/cmd/vfsgendev
npm run build
# Running 'npm run build-frontend-and-tailon' will build frontend as well as tailon.
