import type {RepositoryModuleIssueInterface} from "@/config/interfacesAPI.ts";
import {FileType, FlaskConical, FolderLock, Map, Square} from "lucide-react";
import {cloneElement, type JSX} from "react";

export default function ModuleState({issue}: { issue: RepositoryModuleIssueInterface }) {
    const moduleInfo = moduleIssueTable[issue.module_id]
    const icon = cloneElement(moduleInfo.icon, {height: "17px"})
    const parentClasses = moduleInfo.importance ===  "critical" ? "text-red-300 bg-red-900" : "text-yellow-300 bg-yellow-900"

    return (
        <div className={"flex rounded-md p-1 grow-0 " + parentClasses}>
            <div className={"mr-1"}>{icon}</div>
            <p className={"text-xs mr-1"}>{moduleIssueTable[issue.module_id].name}</p>
        </div>
    )
}

const moduleIssueTable: Record<string, moduleIssueTableInterface> = {
    system_data_access: {
        name: "Resource Access Issue",
        icon: <FolderLock />,
        importance: "critical"
    },
    system_yaml_parser: {
        name: "YAML Parser Failer",
        icon: <FileType />,
        importance: "critical"
    },

    processor_chemistry: {
        name: "Chemistry Processor Failer",
        icon: <FlaskConical />,
        importance: "medium"
    },
    processor_map: {
        name: "Map Processor Failer",
        icon: <Map />,
        importance: "medium"
    },
    processor_tile: {
        name: "Tile Processor Failer",
        icon: <Square />,
        importance: "medium"
    },
    processor_entity: {
        name: "Entity Processor Failer",
        icon: <Square />,
        importance: "medium"
    },
}

type moduleIssueTableInterface = {
    name: string,
    icon: JSX.Element,
    importance: string
}