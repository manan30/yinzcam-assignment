import React from 'react';
import PropTypes from 'prop-types';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

function InfiniteScroll({
  initialItems,
  itemComponent: Component,
  itemComponentProps,
  loadingComponent,
  callback,
}) {
  const { details, loading, loadingElementRef } = useInfiniteScroll(
    callback,
    initialItems
  );

  return (
    <>
      {details.results.map((item, i) => {
        const idx = i;
        const props = itemComponentProps.reduce((acc, curr) => {
          acc[curr] = item[curr];
          return acc;
        }, {});
        return <Component key={idx} {...props} />;
      })}
      {details.hasMore && (
        <div ref={loadingElementRef}>{loading && loadingComponent}</div>
      )}
    </>
  );
}

InfiniteScroll.propTypes = {
  initialItems: PropTypes.objectOf(PropTypes.any),
  itemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  itemComponentProps: PropTypes.arrayOf(PropTypes.string),
  loadingComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  callback: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  initialItems: {},
  itemComponent: <> </>,
  itemComponentProps: [],
  loadingComponent: <> </>,
  callback: () => console.log(),
};

export default InfiniteScroll;
