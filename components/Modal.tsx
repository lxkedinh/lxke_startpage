import { useSpring, animated } from "@react-spring/web";
import { useModalContext } from "../util/contexts";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = () => {
  const { modalText, setModalOpen } = useModalContext();
  const [springs, api] = useSpring(() => ({
    from: {
      y: 10,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
  }));

  const handleCloseModal = () => {
    api.start(() => ({
      from: {
        y: 0,
        opacity: 1,
      },
      to: {
        y: 10,
        opacity: 0,
      },
      onRest: () => setModalOpen(false),
    }));
  };

  return (
    <animated.div
      id="modal"
      className="absolute bottom-6 bg-ctp-surface0 p-1 px-4 flex flex-row items-center"
      style={springs}
    >
      <p className="font-[Kubasta] text-ctp-red text-lg">{modalText}</p>
      <FontAwesomeIcon
        icon={faTimes}
        className="text-ctp-lavender ml-4 hover:cursor-pointer"
        onClick={handleCloseModal}
      />
    </animated.div>
  );
};

export default Modal;
