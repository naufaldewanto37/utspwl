# grpc_server.py
from concurrent import futures
import grpc
import product_pb2
import product_pb2_grpc

class ProductService(product_pb2_grpc.ProductServiceServicer):
    def GetProductPrice(self, request, context):
        # Logic to get prices from database, etc.
        prices = {1: 10.0, 2: 20.0, 3: 30.0}  # Example prices
        return product_pb2.ProductResponse(prices={id: prices.get(id, 0) for id in request.product_ids})

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    product_pb2_grpc.add_ProductServiceServicer_to_server(ProductService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
