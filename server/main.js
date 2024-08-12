import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities';
import { loadInitialData } from '../infra/initial-data';
import { People } from '../people/people';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  Meteor.publish('communities', () => Communities.find());
  Meteor.publish('people', () => People.find());

  Meteor.methods({
    async checkIn(personId) {
      await People.updateAsync(personId, { $set: { checkedInAt: new Date() } });
    },
    async checkOut(personId) {
      await People.updateAsync(personId, {
        $set: { checkedOutAt: new Date() },
      });
    },
  });
});
