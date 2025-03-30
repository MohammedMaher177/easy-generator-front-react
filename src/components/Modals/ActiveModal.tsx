import FadeInModal from '../FadeInModal';

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isActive: boolean;
    name: string;
    loading?: boolean;
};

export default function ActiveModal({ isActive, name, onClose, onSubmit, show, loading }: Props) {
    return (
        <FadeInModal show={show} onClose={onClose} onSubmit={onSubmit} loading={loading}>
            <h2 className="text-xl w-fit font-bold text-black text-nowrap text-ellipsis line-clamp-3 overflow-hidden">
                Are you sure to {isActive && 'Dis-'}Active {name}?
            </h2>
        </FadeInModal>
    );
}
