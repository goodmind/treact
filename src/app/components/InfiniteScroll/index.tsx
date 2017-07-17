import * as React from 'react';

type Loader = React.ReactElement<object> | null;

interface IProps {
  element: string;
  hasMore: boolean;
  initialLoad: boolean;
  isReverse: boolean;
  loadMore: (n: number) => void;
  pageStart: number;
  threshold: number;
  useCapture: boolean;
  useWindow: boolean;
  children: React.ReactNode;
  loader: Loader;
  ref(node: HTMLElement): void;
}

type IExtProps = React.HTMLProps<HTMLElement> & {
  element?: string;
  hasMore?: boolean;
  initialLoad?: boolean;
  isReverse?: boolean;
  loadMore: (n: number) => void;
  pageStart?: number;
  threshold?: number;
  useCapture?: boolean;
  useWindow?: boolean;
  children: React.ReactNode;
  loader?: Loader;
};

class InfiniteScroll extends React.Component<IProps, {}> {
  private scrollComponent: HTMLElement;
  private pageLoaded: number;
  private defaultLoader: Loader;

  public static defaultProps: Partial<IProps> = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    pageStart: 0,
    threshold: 250,
    useWindow: true,
    isReverse: false,
    useCapture: false,
    loader: null,
  };

  constructor(props: IProps) {
    super(props);

    this.scrollListener = this.scrollListener.bind(this);
  }

  public componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  public componentDidUpdate() {
    this.attachScrollListener();
  }

  public componentWillUnmount() {
    this.detachScrollListener();
  }

  // Set a defaut loader for all your `InfiniteScroll` components
  public setDefaultLoader(loader: Loader) {
    this.defaultLoader = loader;
  }

  public detachScrollListener() {
    let scrollEl: EventTarget = window;
    if (this.props.useWindow === false && this.scrollComponent.parentNode) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener('scroll', this.scrollListener, this.props.useCapture);
    scrollEl.removeEventListener('resize', this.scrollListener, this.props.useCapture);
  }

  public attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }

    let scrollEl: EventTarget = window;
    if (this.props.useWindow === false && this.scrollComponent.parentNode) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);
    scrollEl.addEventListener('resize', this.scrollListener, this.props.useCapture);

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  public scrollListener() {
    const el = this.scrollComponent;
    const scrollEl = window;

    let offset;
    if (this.props.useWindow) {
      const scrollTop = (scrollEl.pageYOffset !== undefined) ?
       scrollEl.pageYOffset :
       (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (this.props.isReverse) {
        offset = scrollTop;
      } else {
        offset = this.calculateTopPosition(el) +
                     (el.offsetHeight -
                     scrollTop -
                     window.innerHeight);
      }
    } else if (this.props.isReverse && el.parentElement) {
      offset = el.parentElement.scrollTop;
    } else if (el.parentElement) {
      offset = el.scrollHeight - el.parentElement.scrollTop - el.parentElement.clientHeight;
    }

    if (offset && offset < Number(this.props.threshold)) {
      this.detachScrollListener();
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (typeof this.props.loadMore === 'function') {
        this.props.loadMore(this.pageLoaded += 1);
      }
    }
  }

  public calculateTopPosition(el: HTMLElement): number {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent as HTMLElement);
  }

  public render() {
    const {
      children,
      element,
      hasMore,
      initialLoad,
      isReverse,
      loader,
      loadMore,
      pageStart,
      threshold,
      useCapture,
      useWindow,
      ...props,
    } = this.props;

    (props as IProps).ref = (node: HTMLElement) => {
      this.scrollComponent = node;
    };

    return React.createElement(
        element,
        props,
        children,
        hasMore && (loader || this.defaultLoader),
    );
  }
}

const hoc: React.ComponentClass<IExtProps> = InfiniteScroll;

export { hoc as InfiniteScroll };
