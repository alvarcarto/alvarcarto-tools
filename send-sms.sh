
# See your auth token at https://www.twilio.com/console/project/settings

function usage {
  echo "Usage: ./send-sms.sh +358401234567 'Hi!\n\nThis is my message.\n\nAlvar Carto'"
  exit 1
}

if [ -z "$1" ]
then
    usage
fi

if [ -z "$2" ]
then
    usage
fi

if [ -z "$TWILIO_AUTH_TOKEN" ]
then
    echo "You need to set TWILIO_AUTH_TOKEN from https://www.twilio.com/console/project/settings"
    exit 1
fi

curl 'https://api.twilio.com/2010-04-01/Accounts/ACec2aeb4c511292dddbdde3598feb8b07/Messages.json' -X POST \
  --data-urlencode "To=$1" \
  --data-urlencode 'From=MG4033e4b006a70ac3623741974cbc3863' \
  --data-urlencode "Body=$2" \
  -u ACec2aeb4c511292dddbdde3598feb8b07:$TWILIO_AUTH_TOKEN