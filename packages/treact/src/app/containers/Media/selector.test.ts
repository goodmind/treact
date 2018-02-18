import { Store } from 'redux/store.h'
import { entitiesSelector, mediaSelector } from './selector'

describe('Memoized media selector', () => {
  const store1 = ({
    media: {
      byId: {
        1: {
          _: 'messageMediaDocument',
          document: 2,
        },
      },
    },
    documents: {
      byId: {
        2: {
          _: 'document',
        },
      },
    },
    photoSizes: {},
    photos: {},
    files: {
      locations: {},
    },
  } as any) as Store

  const store2 = ({
    media: {
      byId: {
        1: {
          _: 'messageMediaDocument',
          document: 2,
        },
      },
    },
    documents: {
      byId: {
        2: {
          _: 'document',
        },
      },
    },
    photoSizes: {
      byId: {
        3: { _: 'photoSize' },
      },
    },
    photos: {},
    files: {
      locations: {
        2: { _: 'fileLocation' },
      },
    },
  } as any) as Store

  it('should called two times', () => {
    const mediaProps: any = {
      media: { id: 1, schema: 'messageMediaDocument' },
    }

    const media1 = mediaSelector(store1, mediaProps)
    const media2 = mediaSelector(store2, mediaProps)
    const entities1 = entitiesSelector(store1, mediaProps)
    const entities2 = entitiesSelector(store2, mediaProps)

    expect(media1).toMatchSnapshot()
    expect(media2).toMatchSnapshot()
    expect(entities1).toMatchSnapshot()
    expect(entities2).toMatchSnapshot()

    expect(entities1).toEqual(entities2)
    expect(media1).toEqual(media2)
  })

  it('should not recompute mediaSelector', () => {
    expect(mediaSelector.recomputations()).toBe(1)
  })
})
