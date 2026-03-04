import { motion as Motion } from "framer-motion";
import API from "../api/axios";

const plans = ["Select", "Prestige", "Imperial"];

const MembershipModal = ({ closeModal, refreshProfile }) => {

  const purchaseMembership = async (plan) => {
    await API.put("/membership/purchase", { membership: plan });
    refreshProfile();
    closeModal();
    alert(`🎉 ${plan} Membership Activated`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 text-white p-8 rounded-2xl w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-4">Choose Membership</h2>

        {plans.map(plan => (
          <button
            key={plan}
            onClick={() => purchaseMembership(plan)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mb-3 hover:scale-105 transition"
          >
            Buy {plan}
          </button>
        ))}

        <button
          onClick={closeModal}
          className="mt-4 text-red-400"
        >
          Cancel
        </button>
      </Motion.div>
    </div>
  );
};

export default MembershipModal;
