import { CircularProgress } from "@material-ui/core";

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </div>
    );
};

export default Loading;
