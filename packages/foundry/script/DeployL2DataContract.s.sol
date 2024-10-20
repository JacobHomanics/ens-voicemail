//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {L2DataContract} from "../contracts/L2DataContract.sol";
import "./DeployHelpers.s.sol";

contract DeployL2DataContract is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        L2DataContract yourContract = new L2DataContract();

        yourContract.register(
            "test",
            0x9CD569940053fB35Fec78529F7DE456c712b13f8
        );
        console.logString(
            string.concat(
                "YourContract deployed at: ",
                vm.toString(address(yourContract))
            )
        );
    }
}
