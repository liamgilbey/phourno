#!/bin/sh

set -e

# use specified user name or use `default` if not specified
USERNAME="${USERNAME:-phourno}"

# use specified group name or use the same user name also as the group name
GROUP="${GROUP:-${USERNAME}}"

# use the specified UID for the user
PUID="${PUID:-1000}"

# use the specified GID for the user
GUID="${GUID:-${PUID}}"


# check to see if group exists; if not, create it
if grep -q -E "^${GROUP}:" /etc/group > /dev/null 2>&1
then
  echo "INFO: Group exists; skipping creation"
else
  echo "INFO: Group doesn't exist; creating..."
  # create the group
  addgroup -g "${GUID}" "${GROUP}" || (echo "INFO: Group exists but with a different name; renaming..."; groupmod -g "${GUID}" -n "${GROUP}" "$(awk -F ':' '{print $1":"$3}' < /etc/group | grep ":${GUID}$" | awk -F ":" '{print $1}')")
fi


# check to see if user exists; if not, create it
if id -u "${USERNAME}" > /dev/null 2>&1
then
  echo "INFO: User exists; skipping creation"
else
  echo "INFO: User doesn't exist; creating..."
  # create the user
  adduser -u "${PUID}" -G "${GROUP}" -h "/home/${USERNAME}" -s /bin/sh -D "${USERNAME}"
fi

# make the directories needed to run my app
mkdir -p /opt/myapp

# change ownership of any directories needed to run my app as the proper UID/GID
chown -R "${USERNAME}:${GROUP}" "/opt/myapp"

# start myapp
echo "INFO: Running myapp as ${USERNAME}:${GROUP} (${PUID}:${GUID})"

# exec and run the actual process specified in the CMD of the Dockerfile (which gets passed as ${*})
exec su-exec "${USERNAME}" "${@}"