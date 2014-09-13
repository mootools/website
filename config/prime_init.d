#!/bin/bash

NAME="mootools-website"
PID="/var/run/$NAME.pid"

. /lib/lsb/init-functions

case "$1" in
	start)
		echo "starting $NAME"
		touch $PID
		start-stop-daemon --start --pidfile $PID --make-pidfile --background \
			--exec /usr/bin/node /vagrant/mootools-website
		echo "$NAME started"
		;;
	stop)
		echo "stopping $NAME"
		start-stop-daemon --stop --pidfile $PID
		echo "stopped $NAME"
		;;
	restart)
		$0 stop
		$0 start
		;;
	status)
		status_of_proc $PID /usr/bin/node node
		;;
	*)
		echo "Usage: $0 {start|stop|restart|status}" >&2
		exit 1
	;;
esac
