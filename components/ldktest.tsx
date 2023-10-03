import LDK, { BroadcasterInterface, BroadcasterInterfaceInterface, ChainMonitor, ConfirmationTarget, DefaultRouter, FeeEstimatorInterface, Filter, FilterInterface, KeysManager, Logger, LoggerInterface, NetworkGraph, Persist, PersistInterface } from "lightningdevkit"
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

// 4. Persist

class MyPersister implements PersistInterface {
    persist_new_channel(channel_id: LDK.OutPoint, data: LDK.ChannelMonitor, update_id: LDK.MonitorUpdateId): LDK.ChannelMonitorUpdateStatus {
        console.log("Persisting")
        return LDK.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed
        
    }
    update_persisted_channel(channel_id: LDK.OutPoint, update: LDK.ChannelMonitorUpdate, data: LDK.ChannelMonitor, update_id: LDK.MonitorUpdateId): LDK.ChannelMonitorUpdateStatus {
        console.log("Updating Persist")
        return LDK.ChannelMonitorUpdateStatus.LDKChannelMonitorUpdateStatus_Completed
    }
}

let persister = new MyPersister()

// 5. Fiter (optional)

class MyFilter implements FilterInterface {
    register_tx(txid: Uint8Array, script_pubkey: Uint8Array): void {
        console.log(txid)
        console.log(script_pubkey)
    }
    register_output(output: LDK.WatchedOutput): void {
        console.log(output)
    }
}

let filter = new MyFilter()

// 6. Initialize ChainMonitor

// using "as any" keyword to solve type error
let chainMonitor = new (ChainMonitor.constructor_new as any)(
    filter,
    broadcaster,
    logger,
    feeEstimator,
    persister
)

// 7. KeysManager

let seed = 2 //pseudo random number
let timestampSeconds = Math.floor(new Date().getTime() / 1000);
let timestampNanos = Math.floor(timestampSeconds * 1000 * 1000)

let keysManager = new (KeysManager.constructor_new as any)(
    seed,
    timestampSeconds,
    timestampNanos
)





// ROUTER :: TODO
// let router = new DefaultRouter.constructor_new(
//     new NetworkGraph()
// )
