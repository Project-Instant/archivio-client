import { Pin } from "@/(domains)/pin/models/pin.model";
import { reatomResource, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { sleep } from "@reatom/framework";

export const PINS: Pin[] = [
  {
    id: "asd0918xk",
    fullImage: "https://images.unsplash.com/photo-1744619438376-30bfc6c4666c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Santorini Sunset Views",
    meta: {
      location: {
        addressName: "Santorini, Greece",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Scenic",
    saves: 4200,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "as9z871mxz",
    fullImage: "https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tokyo City Lights",
    meta: {
      location: {
        addressName: "Tokyo, Japan",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Urban",
    saves: 3800,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "as9zxc1sz871mxz",
    fullImage: "https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bali Beach Retreat",
    meta: {
      location: {
        addressName: "Bali, Indonesia",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Beach",
    saves: 5100,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "pig"
    }
  },
  {
    id: "bass9zz871mxz",
    fullImage: "https://images.unsplash.com/photo-1743923754513-ce8fb35d4d69?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Swiss Alps Adventure",
    meta: {
      location: {
        addressName: "Zermatt, Switzerland",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Mountains",
    saves: 2900,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "hexa1szz",
    fullImage: "https://images.unsplash.com/photo-1732786923075-d5880b9dde86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kyoto Temple Tour",
    meta: {
      location: {
        addressName: "Kyoto, Japan",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Cultural",
    saves: 3300,
    owner: {
      id: "askzxjjhak1",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "azxx1asd",
    fullImage: "https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "New York City Skyline",
    meta: {
      location: {
        addressName: "New York, USA",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Urban",
    saves: 4799,
    owner: {
      id: "asdzxcqa",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "asdsazx12",
    fullImage: "https://images.unsplash.com/photo-1742943679519-ee406c510232?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Machu Picchu Hike",
    meta: {
      location: {
        addressName: "Cusco, Peru",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Adventure",
    saves: 6200,
    owner: {
      id: "askzxjjhak1",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "ahas1zxcas",
    fullImage: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Northern Lights Experience",
    meta: {
      location: {
        addressName: "Tromsø, Norway",
        coords: {
          lat: 69.648819,
          lng: 18.951568
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Nature",
    saves: 5666,
    owner: {
      id: "askzxjjhak1",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "sadf1234zxc",
    fullImage: "https://images.unsplash.com/photo-1740525030760-5a8614c377dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzMHxGem8zenVPSE42d3x8ZW58MHx8fHx8",
    title: "Ullswater Lake",
    meta: {
      location: {
        addressName: "Lake District National Park, United Kingdom",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      width: 1080,
      size: 123123,
    },
    createdAt: new Date(),
    category: "Nature",
    saves: 1200,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "asdfasdasd12",
    fullImage: "https://images.unsplash.com/photo-1730799582977-d267a2cae529?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    title: "Lake District National Park, United Kingdom",
    meta: {
      location: {
        addressName: "Lake District National Park, United Kingdom",
        coords: {
          lat: 36.321944,
          lng: 27.425278
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Nature",
    saves: 1700,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "asfsagasdf",
    fullImage: "https://images.unsplash.com/photo-1661783607393-6c4ea8f182da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    title: "Lake District National Park, United Kingdom",
    category: "Nature",
    saves: 1800,
    createdAt: new Date(),
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "hezxcbnzxc",
    fullImage: "https://plus.unsplash.com/premium_photo-1706625678451-6fa31c287a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
    title: "Lake District National Park, United Kingdom",
    category: "Nature",
    saves: 1242,
    createdAt: new Date(),
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  },
  {
    id: "asd12kkzxcj",
    fullImage: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Northern Lights Experience",
    meta: {
      location: {
        addressName: "Tromsø, Norway",
        coords: {
          lat: 69.648819,
          lng: 18.951568
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Nature",
    saves: 5500,
    owner: {
      id: "askzxjjhak1",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "asdsadzxc",
    fullImage: "https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tokyo City Lights",
    meta: {
      location: {
        addressName: "Tokyo, Japan",
        coords: {
          lat: 35.6895,
          lng: 139.6917
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Urban",
    saves: 3800,
    owner: {
      id: "askzxjjhak1",
      name: "pig pig",
      login: "pig"
    }
  },
  {
    id: "asdzxcas",
    fullImage: "https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bali Beach Retreat",
    meta: {
      location: {
        addressName: "Bali, Indonesia",
        coords: {
          lat: -8.6897,
          lng: 115.2177
        }
      },
      height: 1920,
      size: 123123,
      width: 1080
    },
    createdAt: new Date(),
    category: "Beach",
    saves: 5100,
    owner: {
      id: "askzxjjhak1",
      name: "Rus Belkin",
      login: "belkin"
    }
  }
]

export const homefeedResource = reatomResource(async (ctx) => {
  return await ctx.schedule(async () => {
    await sleep(2500)
    return PINS;
  })
}).pipe(withDataAtom(), withStatusesAtom(), withErrorAtom())