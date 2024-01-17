import DualRingLoader from "./DualRingLoader";

const FullPageLoader = () => {
  return (
    <div className="tw-fixed tw-inset-0 tw-z-10 tw-flex tw-items-center tw-justify-center tw-bg-white/5">
      <DualRingLoader size={15} />
    </div>
  );
};

export default FullPageLoader;
