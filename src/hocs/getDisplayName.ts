const getDisplayName = (hocName: string, WrappedComponent: React.ComponentType<any>) =>
    `${hocName}(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

export default getDisplayName;
