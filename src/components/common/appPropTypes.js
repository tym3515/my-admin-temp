import PropTypes from 'prop-types';

export const Room = PropTypes.shape(
	{
		url   : PropTypes.string.isRequired,
		state : PropTypes.oneOf(
			[ 'new', 'connecting', 'connected', 'closed' ]).isRequired,
		activeSpeakerName : PropTypes.string
	});

export const Device = PropTypes.shape(
	{
		flag    : PropTypes.string.isRequired,
		name    : PropTypes.string.isRequired,
		version : PropTypes.string
	});

export const Me = PropTypes.shape(
	{
		id                   : PropTypes.string.isRequired,
		displayName          : PropTypes.string,
		displayNameSet       : PropTypes.bool.isRequired,
		device               : Device.isRequired,
		canSendMic           : PropTypes.bool.isRequired,
		canSendWebcam        : PropTypes.bool.isRequired,
		webcamInProgress     : PropTypes.bool.isRequired,
		audioOnly            : PropTypes.bool.isRequired,
		audioOnlyInProgress  : PropTypes.bool.isRequired,
		restartIceInProgress : PropTypes.bool.isRequired
	});

export const Producer = PropTypes.shape(
	{
		id             : PropTypes.string.isRequired,
		// source         : PropTypes.oneOf([ 'mic', 'webcam', 'screen' ]).isRequired,
		source         : PropTypes.string.isRequired,
		deviceLabel    : PropTypes.string,
		type           : PropTypes.oneOf([ 'camera', 'front', 'back', 'screen' ]),
		locallyPaused  : PropTypes.bool,
		remotelyPaused : PropTypes.bool,
		broadcast      : PropTypes.bool,
		track          : PropTypes.any,
		codec          : PropTypes.string.isRequired
	});

export const Peer = PropTypes.shape(
	{
		id          : PropTypes.string,
		displayName : PropTypes.string,
		share       : PropTypes.string,
		host        : PropTypes.string,
		consumerId  : PropTypes.string,
		device      : Device,
		consumers   : PropTypes.arrayOf(PropTypes.string).isRequired
	});

export const Consumer = PropTypes.shape(
	{
		id             : PropTypes.string.isRequired,
		peerId         : PropTypes.string.isRequired,
		// source         : PropTypes.oneOf([ 'mic', 'webcam', 'screen' ]).isRequired,
		source         : PropTypes.string.isRequired,
		supported      : PropTypes.bool,
		locallyPaused  : PropTypes.bool.isRequired,
		remotelyPaused : PropTypes.bool.isRequired,
		profile        : PropTypes.oneOf([ 'none', 'default', 'low', 'medium', 'high' ]),
		track          : PropTypes.any,
		codec          : PropTypes.string
	});

export const Notification = PropTypes.shape(
	{
		id      : PropTypes.string.isRequired,
		type    : PropTypes.oneOf([ 'info', 'error' ]).isRequired,
		timeout : PropTypes.number
	});

export const Message = PropTypes.shape(
	{
		type      : PropTypes.string,
		component : PropTypes.string,
		text      : PropTypes.string,
		sender    : PropTypes.string
	});

export const FileEntryProps = PropTypes.shape(
	{
		data : PropTypes.shape({
			name    : PropTypes.string.isRequired,
			picture : PropTypes.string,
			file    : PropTypes.shape({
				magnet : PropTypes.string.isRequired
			}).isRequired,
			me : PropTypes.bool
		}).isRequired,
		notify : PropTypes.func.isRequired
	});
