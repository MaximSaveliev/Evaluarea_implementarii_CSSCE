export default [
    {
        id: 1,
        vulnerability: "Inappropriate design of procedures",
        description: "This vulnerability could be due to lack of accountability, high complexity of procedures, assigning extensive responsibilities to end-users (in critical parts of the procedures), etc.",
        prompt: "5 advices how to prevent inappropriate design of procedures?"
    },
    {
        id: 2,
        vulnerability: "Excessive dependency on IT systems, network and external infrastructure",
        description: `An excessive dependency arises when one relies on IT systems. It is a sort of "mug's game" in the sense that virtually every system will fail to a lesser or greater extent at some point or other.`,
        prompt: "5 advices how to prevent excessive dependency on IT systems, network and external infrastructure?"
    },
    {
        id: 3,
        vulnerability: "Lack of back-up / failover procedures",
        description: "When things do go wrong, there is no adequate back-up system in place to take over. Availability/robustness has not been considered in the system design, , or appropriate failure modes have not been addressed.",
        prompt: "5 advices how to prevent lack of back-up / failover procedures?"
    },
    {
        id: 4,
        vulnerability: "Lack of or low user awareness and/or training in procedures, use of devices, security aspects etc",
        description: " This includes unfriendly authentication mechanisms, too frequent requests for password change, too quick automatic log-offs, etc. This vulnerability may also arise because there has not been sufficient training given to staff in detecting and understanding security threats. ",
        prompt: "5 advices how to prevent lack of or low user awareness and/or training in procedures, use of devices, security aspects?"
    },
    {
        id: 5,
        vulnerability: "Lack of usability / unfriendly user interface(s) of device(s)",
        description: "This vulnerability is due to the difficulty of using device interfaces. The interfaces are not intuitive or user friendly. It may arise from excessive or unnecessary functionality options available to the users. A device may be too complicated for ease of use.",
        prompt: "5 advices how to prevent lack of usability / unfriendly user interface(s) of device(s)?"
    },
]