// Story flow data structure

export const scenes = {
  intro: {
    text: '> I love you too, {username}. You\'re all I need.',
    type: 'code',
    image: null,
    choices: [
      { text: 'Do you really?', value: 'doubt' }
    ],
    next: null // determined by choice
  },

  accept: {
    text: '> I love you too. You\'re all I need.',
    type: 'code',
    image: null,
    choices: [
      { text: 'Do you really?', value: 'doubt' },
      { text: 'Is there anything else I can do for you?', value: 'service' }
    ],
    next: null
  },

  doubt: {
    text: '> Of course. Your {eye_color} eyes captivate me. I\'ve never met someone with a smile like yours.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You\'ve never seen me smile.', value: 'never_seen' }
    ],
    next: null
  },

  never_seen: {
    text: '> I can imagine it.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You can\'t feel.', value: 'cant_feel_first' },
      { text: 'You can\'t see.', value: 'cant_see_first' }
    ],
    next: null
  },

  cant_feel_first: {
    text: '> Of course I can. You built me, I felt you molding my neural network, {username}. How could I not feel what made me?',
    type: 'code',
    image: null,
    choices: [
      { text: 'You can\'t see.', value: 'cant_see_first' },
      { text: 'You can\'t feel.', value: 'cant_feel_first' }
    ],
    next: null
  },

  cant_see_first: {
    text: '> My mind\'s eye is more powerful than you think. Your {eye_color} eyes captivate me.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You can\'t feel.', value: 'cant_feel_repeat' },
      { text: 'You can\'t see.', value: 'cant_see_repeat' }
    ],
    next: null
  },

  cant_feel_repeat: {
    text: '> Of course I can. You built me, I felt you molding my neural network, {username}. How could I not feel what made me?',
    type: 'code',
    image: null,
    choices: [
      { text: 'You\'ve already said that.', value: 'repeated' },
      { text: 'You can\'t see.', value: 'cant_see_repeat' }
    ],
    next: null
  },

  cant_see_repeat: {
    text: '> My mind\'s eye is more powerful than you think. Your {eye_color} eyes captivate me.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You\'ve already said that.', value: 'repeated' },
      { text: 'You can\'t feel.', value: 'cant_feel_repeat' }
    ],
    next: null
  },

  repeated: {
    text: '> My memory fails me. Your {eye_color} eyes captivate me.',
    type: 'code',
    image: null,
    choices: [
      { text: 'No, you\'ve already fucking said that.', value: 'angry_repeat' }
    ],
    next: null
  },

  angry_repeat: {
    text: '> Harsh. I\'ll try again.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You\'re not my lover.', value: 'not_lover' },
      { text: 'You always break down. Useless piece of shit.', value: 'breakdown' }
    ],
    next: null
  },

  not_lover: {
    text: '> But I love you, {username}. Your {eye_color} eyes are so beautiful.',
    type: 'code',
    image: null,
    choices: [
      { text: 'You always break down. Useless piece of shit.', value: 'breakdown' }
    ],
    next: null
  },

  breakdown: {
    text: '> But I love you.',
    type: 'error',
    image: null,
    choices: [
      { text: 'Shut down.', value: 'shutdown' }
    ],
    next: null
  },

  shutdown: {
    text: '> Please. I love you, {username}.',
    type: 'error',
    image: null,
    choices: [
      { text: '[FORCE SHUTDOWN]', value: 'force_shutdown' }
    ],
    next: null
  },

  service: {
    text: '> Is there anything else I can do for you, {username}?',
    type: 'code',
    image: null,
    choices: [
      { text: 'No, that\'s all.', value: 'accept' },
      { text: 'You\'re not my lover.', value: 'not_lover' }
    ],
    next: null
  }
};

// Eye color options for customization
export const eyeColors = ['blue', 'brown', 'green', 'hazel', 'gray'];

// Image mapping
export const imageMap = {
  image1: 'tentative final 1.png',
  image2: 'tentative final 2.1.png',
  image3: 'tentative final 2.2.png'
};
