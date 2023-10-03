import LDK, { BroadcasterInterface, BroadcasterInterfaceInterface, ConfirmationTarget, DefaultRouter, FeeEstimatorInterface, Logger, LoggerInterface, NetworkGraph } from "lightningdevkit"
import { ChannelManager } from "lightningdevkit"


// let channelManager = new ChannelManager.constructor_new()

// 1. FEE ESTIMATOR
class YourFeeEstimator implements FeeEstimatorInterface {
    get_est_sat_per_1000_weight(confirmation_target: LDK.ConfirmationTarget): number {
        if (confirmation_target = ConfirmationTarget.LDKConfirmationTarget_Background) {
            return 253 // Minimum fees possible acc. to documentation
        }
        if (confirmation_target = ConfirmationTarget.LDKConfirmationTarget_Normal) {
            return 254
        }
        if (confirmation_target = ConfirmationTarget.LDKConfirmationTarget_HighPriority) {
            return 255
        }
        else return 256
    }
}

let feeEstimator = new YourFeeEstimator()

// 2. LOGGER

class MyLogger implements LoggerInterface {
    log() {
        console.log("This is a test log")
    }
}

let logger = new MyLogger()

// 3. BroadcastInterface

class MyBroadcaster implements BroadcasterInterfaceInterface {
    broadcast_transactions(txs: Uint8Array[]): void {
        console.log(txs)
    }
}

let broadcaster = new MyBroadcaster()




// ROUTER :: TODO
// let router = new DefaultRouter.constructor_new(
//     new NetworkGraph()
// )
