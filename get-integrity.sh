function sha() {
  tempShaOutput=$(cat $1 | openssl dgst -sha384 -binary | openssl base64 -A)
  echo sha384-$tempShaOutput
}

# Usage:
# source get-integrity.sh; sha someFileName.js

echo
echo makeElementDraggable.js
sha makeElementDraggable.js
echo
echo makeElementDraggableAndEditable.js
sha makeElementDraggableAndEditable.js
echo
