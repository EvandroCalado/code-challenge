import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Event } from './Event';
import { GoToTop } from './GoToTop';
import { Header } from './Header';

export const App = () => {
  Meteor.subscribe('totalPeople');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [morePeople, setMorePeople] = useState(1);

  const peoplePerPage = 6;

  // meteor
  const { communities, peoples, totalPeples } = useTracker(() => {
    Meteor.subscribe('communities');
    Meteor.subscribe('people');

    return {
      communities: Communities.find().fetch(),
      peoples: People.find(
        { communityId: selectedCommunity },
        {
          sort: { checkedInAt: -1 },
          limit: peoplePerPage * morePeople,
        }
      ).fetch(),
      totalPeples: People.find({ communityId: selectedCommunity }).count(),
    };
  }, [selectedCommunity, morePeople]);

  const onSelectCommunity = (e) => {
    setSelectedCommunity(e.target.value);
  };

  const eventTitle = communities.filter(
    (community) => community._id === selectedCommunity
  )[0]?.name;

  return (
    <>
      {/* header */}
      <Header onSelectCommunity={onSelectCommunity} communities={communities} />

      {/* event */}
      <Event
        selectedCommunity={selectedCommunity}
        eventTitle={eventTitle}
        peoples={peoples}
        morePeople={morePeople}
        setMorePeople={setMorePeople}
        totalPeples={totalPeples}
      />

      <GoToTop />
    </>
  );
};
