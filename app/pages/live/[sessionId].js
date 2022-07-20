import * as React from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const API_KEY = "47537941";

function handleError(error) {
  if (error) {
    console.error(error);
  }
}

export default function Live() {
  const router = useRouter()
  const [currentSession, setCurrentSession] = React.useState();

  const { sessionId: meetingId } = router.query

  React.useEffect(() => {
    axios.get(`${BASE_URL}/meetingsession/${meetingId}`).then(({ data }) => setCurrentSession(data ));
  }, [meetingId])

  const initStream = React.useCallback(async () => {
    const OT = (await import('@opentok/client')).default;

    const { data: { token }} = await axios.post(`${BASE_URL}/meetingsession/token`, { meetingSessionId: meetingId, userName: 'Adam' });
    const session = OT.initSession(API_KEY, currentSession.sessionId);
    
    // Subscribe to a newly created stream
    session.on('streamCreated', function streamCreated(event) {
      session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    });
    session.on('sessionDisconnected', function sessionDisconnected(event) {
      console.log('You were disconnected from the session.', event.reason);
    });

    // initialize the publisher
    const publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(token, function callback(error) {
      if (error) {
        handleError(error);
      } else {
        // If the connection is successful, publish the publisher to the session
        session.publish(publisher, handleError);
      }
    });
  }, [currentSession, meetingId])

  React.useEffect(() => {
    if (currentSession) {
      initStream();
    }
  }, [currentSession, initStream]);

  return (
    <div style={{ height: '100%', padding: '0 60px'}}>
      <h1>LIVE PAGE</h1>

      <div id="videos" style={{ display: 'flex', height: '100%', gap: '5px'}}>
        <div id="subscriber" style={{ display: 'flex', flex: '1'}} />
        <div id="publisher" style={{ flex: '1', border: '3px solid red'}}/>
      </div>
    </div>
  )
}
