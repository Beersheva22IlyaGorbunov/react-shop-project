import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Client from "../model/Client";
import Order, { OrderStatus } from "../model/Order";
import Product from "../model/Product";
import ProductQuantity from "../model/ProductQuantity";
import OrderService from "./OrderService";
import FirebaseService from "./FirebaseService";
import { FirebaseError } from "firebase/app";
import firestoreApp from "../config/firebaseConfig";
import { Observable, catchError, map, of } from "rxjs";
import { collectionData } from "rxfire/firestore";

const ORDERS_COLLECTION_NAME = "orders";
const USER_ORDERS_COLLECTION_NAME = "userOrders";

export default class OrderServiceFire
  extends FirebaseService
  implements OrderService
{
  private readonly ordersCollectionRef = collection(
    getFirestore(firestoreApp),
    ORDERS_COLLECTION_NAME
  );

  async placeOrder(order: Order): Promise<Order> {
    const orderId = uuid();
    // const userOrdersCollectionRef = this.getUserOrdersRef(order.clientId);
    const docRef = this.getDocRef(this.ordersCollectionRef, orderId);
    order.id = orderId;
    try {
      await setDoc(docRef, order);
      return order;
    } catch (err: any) {
      const firebaseError: FirebaseError = err;
      const errorMessage = this.getErrorMsg(firebaseError);
      throw errorMessage;
    }
  }
  private getUserOrdersRef(uid: string): CollectionReference {
    return collection(
      this.ordersCollectionRef,
      uid,
      USER_ORDERS_COLLECTION_NAME
    );
  }
  updateOrder(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async getUserOrders(uid: string): Promise<Order[]> {
    const q = query(this.ordersCollectionRef, where("clientId", "==", uid));
    try {
      const response = await getDocs(q);
      const res: Order[] = [];
      response.forEach((item) => res.push(this.snapshotToOrder(item)));
      return res;
    } catch (err: any) {
      const firebaseError: FirebaseError = err;
      const errorMessage = this.getErrorMsg(firebaseError);
      throw errorMessage;
    }
  }
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await getDocs(this.ordersCollectionRef);
      const res: Order[] = [];
      response.forEach((item) => res.push(this.snapshotToOrder(item)));
      return res;
    } catch (err: any) {
      const firebaseError: FirebaseError = err;
      const errorMessage = this.getErrorMsg(firebaseError);
      throw errorMessage;
    }
  }
  getAllOrdersRx(): Observable<Order[] | string> {
    return collectionData(this.ordersCollectionRef).pipe(
      catchError((err) => {
        const firebaseError: FirebaseError = err;
        const errorMessage = this.getErrorMsg(firebaseError);
        return of(errorMessage);
      }),
      map((documents) => {
        if (typeof documents === "string") return documents;
        return documents.map((doc) => this.documentDataToOrder(doc));
      })
    ) as Observable<string | Order[]>;
  }
  deleteOrder(uid: string, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private snapshotToOrder(
    snapshot: QueryDocumentSnapshot | DocumentSnapshot
  ): Order {
    const data = snapshot.data();
    if (!data) {
      throw new FirebaseError("not-found", "Product not found");
    }
    console.log(data)
    return this.documentDataToOrder(data)
  }

  private documentDataToOrder(data: DocumentData): Order {
    Object.keys(data.statuses).forEach(function(key) {
      data.statuses[key] = new Date(data.statuses[key].seconds * 1000);
    });
    return {
      id: data.id,
      clientId: data.clientId,
      products: data.products,
      isDelivery: data.isDelivery,
      address: data.address,
      statuses: data.statuses
    };
  }
}
