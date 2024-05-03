import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { topicsTree } from "@/lib/topics";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { LoadingSpinner } from "./loadingspinner";
import { Toggle } from "./toggle";

function TopicList(
  tree: any,
  topicsHook: string[],
  setTopicsHook: Function,
  root?: boolean
) {
  root = root || false;

  const onPressedHandle = (pressed: boolean, node: string) => {
    if (pressed) setTopicsHook([...topicsHook, node]);
    else
      setTopicsHook(
        topicsHook.filter(function (topic) {
          return topic !== node;
        })
      );
  };

  if (!topicsHook || !setTopicsHook)
    return (
      <>
        <LoadingSpinner />
        <p>
          {topicsHook.toString()},{setTopicsHook.toString()}
        </p>
      </>
    );

  return (
    <Accordion
      type="single"
      collapsible
      className={root ? "mt-0 py-0" : "ml-6"}
    >
      {Object.keys(tree).map((node) => {
        return (
          <AccordionItem
            key={node}
            value={node}
            className={`border-none inline ${root ? "" : "ml"}`}
          >
            {Object.keys(tree[node]).length === 0 ? (
              <Toggle
                key={node}
                variant="outline"
                pressed={topicsHook.includes(node)}
                onPressedChange={(pressed) => onPressedHandle(pressed, node)}
                className="m-1"
              >
                {node}
              </Toggle>
            ) : (
              <>
                <AccordionTrigger className="py-3">{node}</AccordionTrigger>
                <AccordionContent className="py-0">
                  {TopicList(tree[node], topicsHook, setTopicsHook)}
                </AccordionContent>
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default function TopicSelect(props: {
  topicsHook: string[];
  setTopicsHook: Function;
}) {
  const [searchTopics, setSearchTopics] = useState(topicsTree);
  const [searchQuery, setSearchQuery] = useState("");

  const filterTopicsByQuery = (query: string, topicsHook: any) => {
    if (!query.trim()) return topicsHook;

    query = query.toLowerCase();

    function filterRecursive(obj: any) {
      let result: any = {};
      for (const key in obj) {
        if (key.toLowerCase().includes(query)) {
          result[key] = filterRecursive(obj[key]);
        } else {
          const filteredChildren = filterRecursive(obj[key]);
          if (Object.keys(filteredChildren).length > 0) {
            result[key] = filteredChildren;
          }
        }
      }
      return result;
    }

    return filterRecursive(topicsHook);
  };

  const search = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchTopics(filterTopicsByQuery(query, topicsTree));
  };

  return (
    <div>
      <Input
        type="text"
        startIcon={Search}
        placeholder="Search for topics"
        value={searchQuery}
        onChange={(e) => search(e)}
        className="mb-2"
      />
      {TopicList(searchTopics, props.topicsHook, props.setTopicsHook, true)}
    </div>
  );
}
