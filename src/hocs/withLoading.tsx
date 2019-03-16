import React from 'react';

import getDisplayName from './getDisplayName';

type WithLoadingProps = {
    loading?: boolean;
    loadedAt?: number | null;
    error?: Error | null;
};

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & WithLoadingProps> {
        static displayName = getDisplayName('withLoading', WrappedComponent);

        static readonly WrappedComponent = WrappedComponent;

        static readonly defaultProps = {
            loading: false,
            loadedAt: null,
            error: null,
        };

        render() {
            const { loading, loadedAt, error, ...props } = this.props;

            if (loadedAt == null) {
                if (loading === true) {
                    return 'Loading...';
                }

                // Error during initial loading
                if (error != null) {
                    return error.message;
                }

                // Initial state
                return null;
            }

            return <WrappedComponent {...props as P} />;
        }
    };

export default withLoading;
