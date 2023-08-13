const checkStatus = (duration) => {
  let durationInMilisecond = duration * 1000;
  let currentTime = new Date().getTime();
  if (currentTime > durationInMilisecond) {
    return true;
  } else {
    return false;
  }
};
export const cardsData = [
  [
    {
      id: "1",
      title: "AAAA ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "167889630833",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "77",
      blockStatus: false,
      fundReleased: false,
      expired: checkStatus(167889630833),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "66",
      blockStatus: false,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cDB3",
      votes: "276",
      blockStatus: true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cDB3",
      votes: "0",
      blockStatus: false,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cDB3",
      votes: "550",
      blockStatus: false,
      fundReleased: true,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
    {
      id: "1",
      title: "AAAA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula metus eu nisi iaculis, at pharetra ex maximus. Suspendisse bibendum ex non tortor semper, a tincidunt arcu rutrum. Vestibulum vel massa in quam ultricies iaculis. Maecenas aliquam nisl a odio tincidunt interdum. Sed tristique consectetur libero, at ullamcorper erat condimentum vel. Aenean euismod mi et ante posuere, id ullamcorper diam bibendum. Nunc congue justo vitae purus facilisis posuere. Duis vitae tortor non odio iaculis cursus. Aliquam laoreet, lectus eu posuere dictum, metus mauris consequat elit, vitae posuere elit elit sit amet lorem.",
      fundRecipient: "0xAE38e0caC36544914a34bb2ebfDce562f28c1680",
      amount: "10000000000000000000",
      duration: "1678896308",
      proposalCreator: "0x4FabfA0238b3341077aa1D760dfC3b99cAB3",
      votes: "4",
      blockStatus:true,
      fundReleased: false,
      expired: checkStatus(1678896308),
    },
  ],
];

export const totalContibutors = 55;

export const connectedWalletAddress = "0x4FabfA0238b3341077aa1D760dfC3b99cDB3";

export const adminWalletAddress = "0x4FabfA0238b3341077aa1D760dfC3b99cB3";


export const totalContributions=33;
