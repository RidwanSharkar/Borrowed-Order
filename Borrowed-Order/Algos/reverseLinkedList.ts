// src/Algos/reverseLinkedList.ts

export interface ListNode {
        val: number;
        next: ListNode | null;
      }
      
      
      export interface Step {
        current: number | null;
        prev: number | null;
        nextNode: number | null;
        list: number[];
      }
      
      export function reverseLinkedList(head: ListNode | null): {
        newHead: ListNode | null;
        steps: Step[];
      } {
        let prev: ListNode | null = null;
        let current = head;
        const steps: Step[] = [];
      
        while (current) {
          const nextNode = current.next;
      
          steps.push({
            current: current.val,
            prev: prev ? prev.val : null,
            nextNode: nextNode ? nextNode.val : null,
            list: getListValues(current),
          });
      
          current.next = prev;
          prev = current;
          current = nextNode;
        }
      
        return { newHead: prev, steps };
      }
      
      export function getListValues(head: ListNode | null): number[] {
        const values: number[] = [];
        let current = head;
        while (current) {
          values.push(current.val);
          current = current.next;
        }
        return values;
      }
      
      export function createLinkedList(values: number[]): ListNode | null {
        if (!values.length) return null;
        const head: ListNode = { val: values[0], next: null };
        let current = head;
        for (let i = 1; i < values.length; i++) {
          current.next = { val: values[i], next: null };
          current = current.next;
        }
        return head;
      }
      