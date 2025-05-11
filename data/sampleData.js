export const organizations = [
  {
    id: '1',
    name: 'Compassion International',
    type: 'Nonprofit Organization',
    tagline: "Releasing children from poverty in Jesus' name",
    banner: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGRyZW4lMjBhZnJpY2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Compassion_International_Logo.svg/320px-Compassion_International_Logo.svg.png',
    followers: '2.3M',
    location: 'Colorado Springs, CO',
    about: 'Compassion International is a child-sponsorship organization that aims to release children from economic, physical, social, and spiritual poverty.',
    category: 'Charity'
  },
  {
    id: '2',
    name: 'Elevation Church',
    type: 'Religious Organization',
    tagline: 'Worship, community, and life transformation',
    banner: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxldmF0ZWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Elevation_Church_Logo.png/220px-Elevation_Church_Logo.png',
    followers: '1.7M',
    location: 'Charlotte, NC',
    about: 'Elevation Church is a multi-site church pastored by Steven Furtick, with locations across the US and growing global reach through online services.',
    category: 'Church'
  },
  // Add other organizations from OrganizationsScreen.js if needed
];

export const organizationDetails = {
  '1': {
    website: 'https://www.compassion.com',
    founded: '1952',
    employees: '1,000-5,000',
    description: `Compassion International is a Christian humanitarian aid child sponsorship organization dedicated to the long-term development of children living in poverty around the world. Compassion International, headquartered in Colorado Springs, Colorado, functions in 25 countries such as Bolivia, Colombia, Mexico, Haiti, and Kenya. The organization provides aid to more than 2 million babies, children, and young adults.\n\nCompassion's main program is child sponsorship, in which a child in need is connected with a sponsor who provides financial support on a monthly basis. Through Compassion's program centers, children receive educational, health, social, and spiritual support. Each sponsored child is linked to one sponsor, who receives updates on the child's development through letters and photos.\n\nCompassion delivers its holistic child development model through local churches. Programs include early childhood development for infants and their caregivers, sponsorship programs for school-aged children, and leadership development for qualifying young adults.`
  },
  '2': {
    website: 'https://elevationchurch.org',
    founded: '2006',
    employees: '100-500',
    description: `Elevation Church is a multi-site church led by Pastor Steven Furtick, headquartered in Charlotte, North Carolina. As of 2022, Elevation Church has 20 locations, with the majority in and around the Charlotte area.\n\nElevation Church's services consist of worship and a sermon. The church holds weekend worship services at its different locations. The church also offers eGroups, which are small groups that meet throughout the week. These groups focus on building community, Bible study, and serving others.\n\nElevation Church is known for its worship ministry, Elevation Worship, which has produced numerous popular worship songs that are sung in churches around the world. The church has been recognized for its growth, innovative approach to ministry, and technological integration.`
  },
  // Add other details from OrganizationDetailScreen.js if needed
};

export const momentsByOrganization = {
  '1': [
    {
      date: new Date().toISOString().split('T')[0],
      sections: [
        {
          id: 'intro',
          title: 'Introduction',
          content: [
            { type: 'text', value: 'Welcome to our daily moment of reflection, sponsored by Compassion International.' },
            { type: 'text', value: 'Today, we encourage you to think about the impact of sponsorship.' },
          ],
        },
        {
          id: 'reading',
          title: 'Verse of the Day: Matthew 25:40',
          content: [
            { type: 'text', value: '"The King will reply, \'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.\'"' },
            { type: 'audio', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', placeholder: '🎧 Listen to Matthew 25:40' }, // Placeholder URL
          ],
        },
        {
          id: 'worship',
          title: 'Reflective Song',
          content: [
            { type: 'text', value: 'Consider listening to "Blessings" by Laura Story.' },
            { type: 'video', source: '#', placeholder: '📺 Watch a reflective music video' },
          ],
        },
      ],
    },
  ],
  '2': [
    {
      date: new Date().toISOString().split('T')[0],
      sections: [
        {
          id: 'welcome',
          title: 'Welcome to Today\'s Word - Elevation Church',
          content: [
            { type: 'text', value: 'Pastor Steven Furtick shares a powerful message to start your day.' },
            { type: 'video', source: '#', placeholder: '▶️ Watch Today\'s Word' },
          ],
        },
      ],
    }
  ],
};

export const groupsByOrganization = {
  '1': [
    {
      id: 'group101',
      organizationId: '1',
      name: 'Compassion Advocates Network',
      description: 'A group for active supporters and advocates of Compassion International to share ideas, resources, and encouragement.',
      membersCount: 1250,
      adminIds: ['userAdmin1', 'userAdmin2'],
      coverImage: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&w=500&q=60',
      posts: [
        { id: 'post1', userId: 'userAdmin1', timestamp: new Date(Date.now() - 86400000).toISOString(), text: 'Welcome everyone to our new advocates network! We are thrilled to have you.' },
        { id: 'post2', userId: 'userMember3', timestamp: new Date(Date.now() - 3600000).toISOString(), text: 'Excited to be here and connect with fellow supporters!' },
      ],
      digitalContent: [
        { id: 'content1', title: 'Advocacy Toolkit 2024', type: 'PDF', url: '#', access: 'members_only' },
        { id: 'content2', title: 'Impact Stories Webinar Recording', type: 'Video', url: '#', access: 'members_only' },
      ],
      channels: [
        {
          id: 'channel-general',
          name: 'general',
          description: 'General discussion for all members',
          isDefault: true,
          messages: [
            { 
              id: 'msg1',
              userId: 'userAdmin1', 
              username: 'Sarah Johnson',
              avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
              text: 'Hello everyone! Welcome to the Advocates Network. This is our general channel for all members.', 
              timestamp: new Date(Date.now() - 87400000).toISOString(),
              reactions: [
                { emoji: '👋', count: 5, userIds: ['userMember2', 'userMember3', 'userMember4', 'userMember5', 'userMember6'] },
                { emoji: '❤️', count: 3, userIds: ['userMember7', 'userMember8', 'userMember9'] }
              ],
              threadReplies: [
                {
                  id: 'reply1',
                  userId: 'userMember2',
                  username: 'Michael Chen',
                  avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
                  text: 'Thanks for the warm welcome! Looking forward to connecting with everyone.',
                  timestamp: new Date(Date.now() - 87300000).toISOString(),
                  reactions: [
                    { emoji: '👍', count: 2, userIds: ['userAdmin1', 'userMember3'] }
                  ]
                },
                {
                  id: 'reply2',
                  userId: 'userAdmin1',
                  username: 'Sarah Johnson',
                  avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
                  text: 'Our first virtual meet and greet is scheduled for next Friday. Hope to see you all there!',
                  timestamp: new Date(Date.now() - 87200000).toISOString(),
                  reactions: [
                    { emoji: '🎉', count: 4, userIds: ['userMember2', 'userMember3', 'userMember4', 'userMember5'] }
                  ]
                }
              ]
            },
            { 
              id: 'msg2', 
              userId: 'userMember3', 
              username: 'Emily Rodriguez',
              avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
              text: 'Hi everyone! Glad to be here.', 
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              reactions: [],
              threadReplies: []
            },
            { 
              id: 'msg3', 
              userId: 'userAdmin1', 
              username: 'Sarah Johnson',
              avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
              text: 'Feel free to introduce yourselves and share what you are passionate about.', 
              timestamp: new Date(Date.now() - 85400000).toISOString(),
              reactions: [
                { emoji: '👍', count: 2, userIds: ['userMember3', 'userMember4'] }
              ],
              threadReplies: []
            },
            { 
              id: 'msg4', 
              userId: 'userMember4', 
              username: 'John Davis',
              avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
              text: 'Hey! I am John from California. Passionate about child education.', 
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              reactions: [
                { emoji: '🙌', count: 3, userIds: ['userMember3', 'userAdmin1', 'userMember2'] }
              ],
              threadReplies: []
            },
          ]
        },
        {
          id: 'channel-events',
          name: 'events',
          description: 'Upcoming events and meetups',
          isDefault: false,
          messages: [
            { 
              id: 'msg5', 
              userId: 'userAdmin1', 
              username: 'Sarah Johnson',
              avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
              text: 'Our annual fundraising gala will be on November 15th. Mark your calendars!', 
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              reactions: [
                { emoji: '🗓️', count: 8, userIds: ['userMember2', 'userMember3', 'userMember4', 'userMember5', 'userMember6', 'userMember7', 'userMember8', 'userMember9'] }
              ],
              threadReplies: [
                {
                  id: 'reply3',
                  userId: 'userMember5',
                  username: 'Laura Kim',
                  avatarUrl: 'https://randomuser.me/api/portraits/women/62.jpg',
                  text: 'Will this be in-person or virtual?',
                  timestamp: new Date(Date.now() - 172700000).toISOString(),
                  reactions: []
                },
                {
                  id: 'reply4',
                  userId: 'userAdmin1',
                  username: 'Sarah Johnson',
                  avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
                  text: 'It\'s a hybrid event! You can attend in person at the convention center or join virtually.',
                  timestamp: new Date(Date.now() - 172600000).toISOString(),
                  reactions: [
                    { emoji: '👍', count: 1, userIds: ['userMember5'] }
                  ]
                }
              ]
            },
            { 
              id: 'msg6',
              userId: 'userAdmin2',
              username: 'Robert Wilson',
              avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
              text: 'Don\'t forget our weekly virtual coffee chat tomorrow at 10am PST!',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              reactions: [
                { emoji: '☕', count: 5, userIds: ['userMember2', 'userMember7', 'userMember3', 'userMember9', 'userMember5'] }
              ],
              threadReplies: []
            }
          ]
        },
        {
          id: 'channel-resources',
          name: 'resources',
          description: 'Share helpful resources and materials',
          isDefault: false,
          messages: [
            { 
              id: 'msg7',
              userId: 'userAdmin1',
              username: 'Sarah Johnson',
              avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
              text: 'Here\'s our updated advocacy handbook for 2024: [link to PDF]',
              timestamp: new Date(Date.now() - 259200000).toISOString(),
              reactions: [
                { emoji: '🙏', count: 12, userIds: ['userMember2', 'userMember3', 'userMember4', 'userMember5', 'userMember6', 'userMember7', 'userMember8', 'userMember9', 'userMember10', 'userMember11', 'userMember12', 'userMember13'] }
              ],
              threadReplies: []
            }
          ]
        }
      ],
      currentUserId: 'currentUser123',
    },
    {
      id: 'group102',
      organizationId: '1',
      name: 'Prayer Warriors for Children',
      description: 'A dedicated space for individuals committed to praying for the children served by Compassion International.',
      membersCount: 850,
      adminIds: ['userAdmin1'],
      coverImage: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1db?auto=format&fit=crop&w=500&q=60',
      posts: [
        { id: 'post3', userId: 'userAdmin1', timestamp: new Date().toISOString(), text: 'This week\'s prayer focus: Children in East Africa. Please lift them up.' },
      ],
      digitalContent: [],
      channels: [
        {
          id: 'channel-general',
          name: 'general',
          description: 'General prayer requests and discussion',
          isDefault: true,
          messages: [
            { 
              id: 'msg8', 
              userId: 'userAdmin1', 
              username: 'Sarah Johnson',
              avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
              text: 'Welcome, prayer warriors. This week, let\'s focus on children in East Africa.', 
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              reactions: [
                { emoji: '🙏', count: 15, userIds: Array(15).fill().map((_, i) => `userMember${i + 1}`) }
              ],
              threadReplies: []
            }
          ]
        },
        {
          id: 'channel-testimonies',
          name: 'testimonies',
          description: 'Share testimonies and answered prayers',
          isDefault: false,
          messages: [
            {
              id: 'msg9',
              userId: 'userMember4',
              username: 'John Davis',
              avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
              text: 'I wanted to share that after our group prayed for my sponsored child\'s health last month, I received a letter saying he has made a full recovery!',
              timestamp: new Date(Date.now() - 259200000).toISOString(),
              reactions: [
                { emoji: '❤️', count: 10, userIds: Array(10).fill().map((_, i) => `userMember${i + 5}`) },
                { emoji: '🙏', count: 8, userIds: Array(8).fill().map((_, i) => `userMember${i + 15}`) }
              ],
              threadReplies: [
                {
                  id: 'reply5',
                  userId: 'userAdmin1',
                  username: 'Sarah Johnson',
                  avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
                  text: 'That\'s wonderful news! Thank you for sharing this testimony with us.',
                  timestamp: new Date(Date.now() - 258200000).toISOString(),
                  reactions: [
                    { emoji: '❤️', count: 3, userIds: ['userMember4', 'userMember5', 'userMember6'] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      currentUserId: 'currentUser123',
    },
  ],
  '2': [
    {
      id: 'group201',
      organizationId: '2',
      name: 'Elevation eGroup Leaders',
      description: 'Resources, discussion, and support for all eGroup leaders at Elevation Church.',
      membersCount: 450,
      adminIds: ['userChurchAdmin'],
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=60',
      posts: [
        { id: 'post4', userId: 'userChurchAdmin', timestamp: new Date().toISOString(), text: 'New sermon discussion guides are now available in the Digital Content section!' },
      ],
      digitalContent: [
        { id: 'content3', title: 'Sermon Discussion Guide - Week of Oct 23', type: 'PDF', url: '#', access: 'members_only' },
      ],
      channels: [
        {
          id: 'channel-general',
          name: 'general',
          description: 'General discussion for all eGroup leaders',
          isDefault: true,
          messages: [
            { 
              id: 'msg10', 
              userId: 'userChurchAdmin', 
              username: 'Pastor Mark',
              avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
              text: 'Hi Leaders, the new sermon guides are up. Check them out in Digital Content!', 
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              reactions: [
                { emoji: '👍', count: 8, userIds: Array(8).fill().map((_, i) => `eGroupLeader${i + 1}`) }
              ],
              threadReplies: []
            },
            { 
              id: 'msg11', 
              userId: 'eGroupLeader1', 
              username: 'Jennifer Smith',
              avatarUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
              text: 'Awesome, thanks for the update!', 
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              reactions: [],
              threadReplies: []
            },
          ]
        },
        {
          id: 'channel-leadership-tips',
          name: 'leadership-tips',
          description: 'Share best practices and leadership tips',
          isDefault: false,
          messages: [
            {
              id: 'msg12',
              userId: 'userChurchAdmin',
              username: 'Pastor Mark',
              avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
              text: 'Leadership tip of the week: Make sure to call each member of your group at least once a month for personal connection outside of group meetings.',
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              reactions: [
                { emoji: '💯', count: 12, userIds: Array(12).fill().map((_, i) => `eGroupLeader${i + 1}`) }
              ],
              threadReplies: [
                {
                  id: 'reply6',
                  userId: 'eGroupLeader1',
                  username: 'Jennifer Smith',
                  avatarUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
                  text: 'I\'ve been doing this and it makes such a difference in building relationships!',
                  timestamp: new Date(Date.now() - 172000000).toISOString(),
                  reactions: [
                    { emoji: '👆', count: 3, userIds: ['userChurchAdmin', 'eGroupLeader2', 'eGroupLeader3'] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      currentUserId: 'currentUser123',
    },
  ],
};

// Helper function to find a channel in a specific group
export const findChannel = (groupId, channelId) => {
  // First find the organization that contains the group
  let targetGroup = null;
  
  for (const organizationId in groupsByOrganization) {
    const groups = groupsByOrganization[organizationId];
    const foundGroup = groups.find(group => group.id === groupId);
    if (foundGroup) {
      targetGroup = foundGroup;
      break;
    }
  }
  
  // If group found, find the channel
  if (targetGroup) {
    if (channelId) {
      return targetGroup.channels.find(channel => channel.id === channelId);
    } else {
      // If no channelId specified, return the default channel
      return targetGroup.channels.find(channel => channel.isDefault);
    }
  }
  
  return null;
};

// Helper function to find all users in a group
export const userProfiles = {
  'userAdmin1': {
    id: 'userAdmin1',
    username: 'Sarah Johnson',
    avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    role: 'admin'
  },
  'userAdmin2': {
    id: 'userAdmin2',
    username: 'Robert Wilson',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'admin'
  },
  'userMember2': {
    id: 'userMember2',
    username: 'Michael Chen',
    avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'member'
  },
  'userMember3': {
    id: 'userMember3',
    username: 'Emily Rodriguez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    role: 'member'
  },
  'userMember4': {
    id: 'userMember4',
    username: 'John Davis',
    avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    role: 'member'
  },
  'userMember5': {
    id: 'userMember5',
    username: 'Laura Kim',
    avatarUrl: 'https://randomuser.me/api/portraits/women/62.jpg',
    role: 'member'
  },
  'currentUser123': {
    id: 'currentUser123',
    username: 'You',
    avatarUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
    role: 'member'
  },
  'userChurchAdmin': {
    id: 'userChurchAdmin',
    username: 'Pastor Mark',
    avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
    role: 'admin'
  },
  'eGroupLeader1': {
    id: 'eGroupLeader1',
    username: 'Jennifer Smith',
    avatarUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
    role: 'member'
  }
}; 