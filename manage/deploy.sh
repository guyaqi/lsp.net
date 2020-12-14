# run in project root

PACKAGE=lsp.net
TARGET=root@47.75.243.164
BUILD_DIR=dist
ZIP_NAME=${BUILD_DIR}.zip
echo $ZIP_NAME

npm run build && zip -r -q $ZIP_NAME $BUILD_DIR && scp $ZIP_NAME ${TARGET}:/root && ssh $TARGET "cd /root ; rm -rf $BUILD_DIR ; unzip $ZIP_NAME ; rm -rf /var/www/html/$PACKAGE/* ; mv ./$BUILD_DIR/* /var/www/html/$PACKAGE/"